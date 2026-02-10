import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Pool } from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("Missing DATABASE_URL in environment.");
  process.exit(1);
}

async function main() {
  const sqlPath = path.join(__dirname, "..", "sql", "railway-init.sql");
  const sql = await fs.readFile(sqlPath, "utf-8");

  const pool = new Pool({ connectionString: DATABASE_URL });
  try {
    await pool.query(sql);
    console.log("Database initialized: documents and document_chunks tables ready.");
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  if (err.message && err.message.includes('extension "vector"')) {
    console.error("\nRailway's default Postgres does not include pgvector.");
    console.error("Use Railway's pgvector template to create a new database:");
    console.error("  https://railway.com/template/3jJFCA");
    console.error("Then set DATABASE_URL in .env and run this script again.\n");
  }
  console.error(err);
  process.exit(1);
});
