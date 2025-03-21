const fs = require("fs");
const path = require("path");

const INPUT_FILE = path.join(__dirname, "../public/reablocks/index.css");
const OUTPUT_FILE = path.join(__dirname, "../public/reablocks/properties.css");

function extractProperties() {
  if (!fs.existsSync(INPUT_FILE)) {
    console.error("❌ index.css not found.");
    process.exit(1);
  }

  const cssContent = fs.readFileSync(INPUT_FILE, "utf8");
  const propertyRegex = /@property\s+--[\w-]+\s*\{[^}]+\}/g;
  const properties = cssContent.match(propertyRegex) || [];

  if (properties.length === 0) {
    console.log("⚠️  `index.css` doesn't contain any @property.");
    return;
  }

  fs.writeFileSync(OUTPUT_FILE, properties.join("\n\n"), "utf8");
  console.log(`✅ Saved ${properties.length} @property to properties.css`);
}

extractProperties();
