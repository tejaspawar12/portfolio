import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Pool } from "pg";
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DATABASE_URL = process.env.DATABASE_URL;
const EMBED_MODEL_ID = process.env.BEDROCK_EMBED_MODEL_ID || "amazon.titan-embed-text-v1";

if (!DATABASE_URL) {
  console.error("Missing DATABASE_URL in environment.");
  process.exit(1);
}

const client = new BedrockRuntimeClient({ region: process.env.AWS_REGION || "us-east-1" });

function chunkText(text, maxTokens = 400) {
  const paragraphs = text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const chunks = [];
  let current = [];
  let currentCount = 0;

  for (const para of paragraphs.length ? paragraphs : [text]) {
    const words = para.split(/\s+/).filter(Boolean);
    if (currentCount + words.length > maxTokens && current.length) {
      chunks.push(current.join(" "));
      current = [];
      currentCount = 0;
    }
    current.push(para);
    currentCount += words.length;
  }

  if (current.length) chunks.push(current.join(" "));
  return chunks;
}

async function embedText(text) {
  const payload = JSON.stringify({ inputText: text });
  const command = new InvokeModelCommand({
    modelId: EMBED_MODEL_ID,
    contentType: "application/json",
    accept: "application/json",
    body: payload,
  });

  const response = await client.send(command);
  const body = JSON.parse(Buffer.from(response.body).toString("utf-8"));
  if (!body.embedding) {
    throw new Error("Embedding response missing `embedding` field.");
  }
  return body.embedding;
}

/** Normalize a doc from knowledge.json to { slug, title, section, source, url, content } for DB. */
function normalizeDoc(doc) {
  const slug = doc.slug ?? doc.id;
  const title = doc.title ?? slug;
  const contentRaw = doc.content;
  const content = Array.isArray(contentRaw)
    ? contentRaw.join("\n")
    : typeof contentRaw === "string"
      ? contentRaw
      : "";
  const section = doc.section ?? (slug.split("/")[0] || "general");
  const source = doc.source ?? doc.id ?? slug;
  const url = doc.url ?? null;
  return { slug, title, section, source, url, content };
}

async function main() {
  const dataPath = path.join(__dirname, "..", "data", "assistant", "knowledge.json");
  const raw = await fs.readFile(dataPath, "utf-8");
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    console.error("Invalid JSON in knowledge.json:", err.message);
    process.exit(1);
  }
  const documents = Array.isArray(parsed.documents) ? parsed.documents : [];
  if (documents.length === 0) {
    console.error("knowledge.json has no top-level 'documents' array.");
    process.exit(1);
  }

  const normalized = documents.map(normalizeDoc);
  const currentSlugs = normalized.map((d) => d.slug);

  const pool = new Pool({ connectionString: DATABASE_URL });
  const connection = await pool.connect();

  try {
    const deleteResult = await connection.query(
      `DELETE FROM documents WHERE NOT (slug = ANY($1::text[]))`,
      [currentSlugs]
    );
    if (deleteResult.rowCount > 0) {
      console.log(`Removed ${deleteResult.rowCount} document(s) no longer in knowledge.json`);
    }

    for (const doc of normalized) {
      const { slug, title, section, source, url, content } = doc;
      const result = await connection.query(
        `INSERT INTO documents (slug, title, section, source, url, content)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (slug)
         DO UPDATE SET title = EXCLUDED.title, section = EXCLUDED.section, source = EXCLUDED.source,
           url = EXCLUDED.url, content = EXCLUDED.content, updated_at = now()
         RETURNING id`,
        [slug, title, section, source, url ?? null, content]
      );

      const documentId = result.rows[0].id;
      await connection.query("DELETE FROM document_chunks WHERE document_id = $1", [documentId]);

      const chunks = chunkText(content);
      for (let i = 0; i < chunks.length; i += 1) {
        const chunk = chunks[i];
        const embedding = await embedText(chunk);
        const embeddingString = `[${embedding.join(",")}]`;
        const tokenCount = chunk.split(/\s+/).filter(Boolean).length;
        const metadata = { slug, section, source };

        await connection.query(
          `INSERT INTO document_chunks
           (document_id, chunk_index, chunk_text, token_count, embedding, metadata)
           VALUES ($1, $2, $3, $4, $5::vector, $6::jsonb)`,
          [documentId, i, chunk, tokenCount, embeddingString, JSON.stringify(metadata)]
        );

        await new Promise((resolve) => setTimeout(resolve, 120));
      }

      console.log(`Ingested ${slug} (${chunks.length} chunks)`);
    }
  } finally {
    connection.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
