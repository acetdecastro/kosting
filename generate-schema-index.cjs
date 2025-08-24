const fs = require("fs");
const path = require("path");

// Generate an index.ts file that re-exports all schema files

const SCHEMA_DIR = path.join(__dirname, "src/server/db/schema");
const INDEX_FILE = path.join(SCHEMA_DIR, "index.ts");

const files = fs
  .readdirSync(SCHEMA_DIR)
  .filter((f) => f.endsWith(".ts") && f !== "index.ts");

const exportLines = files.map((f) => {
  const name = f.replace(/\.ts$/, "");
  return `export * from "./${name}";`;
});

fs.writeFileSync(INDEX_FILE, exportLines.join("\n") + "\n");

console.log("Schema index generated at:", INDEX_FILE);
