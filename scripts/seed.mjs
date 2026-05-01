import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import mysql from "mysql2/promise";

const projectRoot = process.cwd();
const seedsDir = path.join(projectRoot, "db", "seeds");

function stripWrappingQuotes(value) {
  return String(value).replace(/^['"]|['"]$/g, "");
}

function getConnectionConfig() {
  const host = process.env.DB_HOST;
  const port = Number(process.env.DB_PORT ?? 3306);
  const user = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_DATABASE;
  const sslEnabled = process.env.DB_SSL !== "false";

  if (!host || !user || !password || !database) {
    throw new Error(
      "Missing DB env values. Required: DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE.",
    );
  }

  return {
    host: stripWrappingQuotes(host),
    port,
    user: stripWrappingQuotes(user),
    password: stripWrappingQuotes(password),
    database: stripWrappingQuotes(database),
    multipleStatements: true,
    ssl: sslEnabled ? { minVersion: "TLSv1.2" } : undefined,
  };
}

async function listSeedFiles() {
  const entries = await fs.readdir(seedsDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".sql"))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

async function run() {
  const fileIndex = process.argv.indexOf("--file");
  const targetFile =
    fileIndex >= 0 ? process.argv[fileIndex + 1] : process.argv[2];

  const files = targetFile ? [targetFile] : await listSeedFiles();

  if (files.length === 0) {
    console.log("No seed files found in db/seeds.");
    return;
  }

  const connection = await mysql.createConnection(getConnectionConfig());

  try {
    for (const fileName of files) {
      const fullPath = path.join(seedsDir, fileName);
      const sql = await fs.readFile(fullPath, "utf8");
      await connection.query(sql);
      console.log(`Seed applied: ${fileName}`);
    }
  } finally {
    await connection.end();
  }
}

run().catch((error) => {
  console.error("Seeding failed:", error.message);
  process.exit(1);
});
