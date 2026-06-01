import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const xlsxPath = path.join(projectRoot, "Records.xlsx");
const outputPath = path.join(projectRoot, "db", "seeds", "001_seed_data.sql");
const pythonScript = path.join(__dirname, "_generate_seed_from_xlsx.py");

if (!fs.existsSync(xlsxPath)) {
  console.error(`Missing ${xlsxPath}`);
  process.exit(1);
}

const result = spawnSync("python", [pythonScript, xlsxPath, outputPath], {
  stdio: "inherit",
  cwd: projectRoot,
});

if (result.status !== 0) {
  console.error("Seed generation failed.");
  process.exit(result.status ?? 1);
}

console.log(`Wrote ${outputPath}`);
