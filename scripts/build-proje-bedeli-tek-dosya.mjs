import fs from "node:fs";
import path from "node:path";

import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "public", "proje-bedeli");
const html = fs.readFileSync(path.join(dir, "index.html"), "utf8");
const css = fs.readFileSync(path.join(dir, "styles.css"), "utf8");
const config = fs.readFileSync(path.join(dir, "config.js"), "utf8");
const app = fs.readFileSync(path.join(dir, "app.js"), "utf8");

let out = html
  .replace(
    '<link rel="stylesheet" href="styles.css" />',
    `<style>\n${css}\n</style>`,
  )
  .replace('<script src="config.js"></script>', `<script>\n${config}\n</script>`)
  .replace('<script src="app.js"></script>', `<script>\n${app}\n</script>`);

out = out.replace(
  "<title>İç Mimar Proje Bedeli — 2026</title>",
  "<title>İç Mimar Proje Bedeli — 2026 (tek dosya)</title>",
);

const dest = path.join(dir, "tek-dosya.html");
fs.writeFileSync(dest, out);
console.log("Wrote", dest, `(${out.length} bytes)`);
