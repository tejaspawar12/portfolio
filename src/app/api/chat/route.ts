import { NextResponse } from "next/server";
import { Pool } from "pg";
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const bedrock = new BedrockRuntimeClient({ region: process.env.AWS_REGION || "us-east-1" });

const CHAT_MODEL_ID = process.env.BEDROCK_CHAT_MODEL_ID || "anthropic.claude-3-haiku-20240307-v1:0";
const EMBED_MODEL_ID = process.env.BEDROCK_EMBED_MODEL_ID || "amazon.titan-embed-text-v1";
const TOP_K = Number(process.env.RAG_TOP_K || 6);
const MAX_CONTEXT = Number(process.env.RAG_MAX_CONTEXT_CHARS || 3500);

export const runtime = "nodejs";

async function embed(text: string) {
  const payload = JSON.stringify({ inputText: text });
  const command = new InvokeModelCommand({
    modelId: EMBED_MODEL_ID,
    contentType: "application/json",
    accept: "application/json",
    body: payload,
  });
  const response = await bedrock.send(command);
  const body = JSON.parse(Buffer.from(response.body).toString("utf-8"));
  return body.embedding as number[];
}

async function retrieve(query: string) {
  const embedding = await embed(query);
  const embeddingString = `[${embedding.join(",")}]`;

  const result = await pool.query(
    `SELECT chunk_text, metadata, 1 - (embedding <=> $1::vector) AS score
     FROM document_chunks
     ORDER BY embedding <=> $1::vector
     LIMIT $2`,
    [embeddingString, TOP_K]
  );

  return result.rows as { chunk_text: string; metadata: { section: string; source: string; slug: string }; score: number }[];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = (body?.message || "").trim();

    if (!message || message.length > 1000) {
      return NextResponse.json({ error: "Invalid message." }, { status: 400 });
    }

    const chunks = await retrieve(message);
    if (!chunks.length) {
      return NextResponse.json({
        reply: "I don’t have enough context to answer that yet. Please check the resume or contact Tejas directly.",
      });
    }

    let context = "";
    for (const chunk of chunks) {
      const addition = `\n[${chunk.metadata.section}] ${chunk.chunk_text}`;
      if (context.length + addition.length > MAX_CONTEXT) break;
      context += addition;
    }

    const prompt = `You are the AI assistant for Tejas Pawar, an AI Systems Engineer.\n\nRules:\n- Answer only using the provided context.\n- If the answer is missing, say you don't know and suggest contacting Tejas.\n- Keep responses concise (under 120 words).\n- Prefer first-person voice ("I").\n\nContext:${context}\n\nQuestion: ${message}`;

    const payload = JSON.stringify({
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 300,
      temperature: 0.2,
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: prompt }],
        },
      ],
    });

    const command = new InvokeModelCommand({
      modelId: CHAT_MODEL_ID,
      contentType: "application/json",
      accept: "application/json",
      body: payload,
    });

    const response = await bedrock.send(command);
    const raw = JSON.parse(Buffer.from(response.body).toString("utf-8"));
    const reply = raw?.content?.[0]?.text ?? "Thanks for your question.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to process request." }, { status: 500 });
  }
}
