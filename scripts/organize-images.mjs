import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const sourceRoot = path.join(root, "görseller");
const destRoot = path.join(root, "public", "images", "products");

/** folder name in görseller → slug */
const MAP = [
  { folder: "1406 Table Lamp", slug: "masa-lambasi-1406" },
  { folder: "Abito C Fossena Vase", slug: "abito-c-fossena-vazo" },
  {
    folder: "Anita Table Lamp in Emperador Marble by Lorenza Bozzoli",
    slug: "anita-emperador-masa-lambasi",
  },
  {
    folder: "Ballarina Gold and Pink Marble effect Murano Glass Sculptural Bowl",
    slug: "ballarina-murano-cam-kase",
  },
  { folder: "Black Long Head Vase", slug: "siyah-uzun-form-vazo" },
  {
    folder: "Brooklyn Black And White Bouclè And Black Leather Belts Pouf",
    slug: "brooklyn-boucle-pouf",
  },
  {
    folder: "Couple Rectangle Brick Red And White Velvet Happy Cushion",
    slug: "happy-velvet-dikdortgen-kirlent",
  },
  { folder: "Dormeuse Ginevra Daybed", slug: "ginevra-daybed" },
  {
    folder: "Eden Sicilian Maiolica Decorative Sculpture",
    slug: "eden-sicilya-maiolica",
  },
  {
    folder: "Happy Frame Camel Velvet Square Cushion",
    slug: "happy-frame-deve-tuyu-kirlent",
  },
  { folder: "Karkadè Bucket Murano Glass Vase", slug: "karkade-murano-vazo" },
  { folder: "Lloyd Black Wood High Pouf", slug: "lloyd-siyah-yuksek-pouf" },
  { folder: "Louis XV Style Daybed", slug: "louis-xv-daybed" },
  {
    folder: "Masini Collectible Egg Sculpture - Safari Collection",
    slug: "masini-safari-yumurta",
  },
  {
    folder: "Milady Black Printed Crocodile Leather Folding Chair",
    slug: "milady-timsah-sandalye",
  },
  {
    folder: "Morandi N.3 Purple Decorative Bottle",
    slug: "morandi-n3-mor-sise",
  },
  {
    folder: "Nefelibata Unique Piece Pouf by Stormo Studio",
    slug: "nefelibata-pouf",
  },
  { folder: "Nina Gray Resin Centerpiece", slug: "nina-gri-centerpiece" },
  { folder: "Patapouff Ottoman", slug: "patapouff-ottoman" },
  { folder: "Pink Bucket Murano Glass Vase", slug: "pembe-murano-vazo" },
  {
    folder: "Pluma Alabaster Diffuser Table Lamp",
    slug: "pluma-alabaster-masa-lambasi",
  },
  {
    folder: "Set of 2 The Gift Mustard Velvet Micro Cushion With Fringes",
    slug: "the-gift-hardal-mini-kirlent",
  },
  { folder: "Vase For two #4 in Gray Ceramic", slug: "vase-for-two-4-gri" },
  {
    folder: "Viburno Rectangular Patterned Blue & Beige Cushion",
    slug: "viburno-desenli-kirlent",
  },
];

const IMAGE_EXT = new Set([".webp", ".jpg", ".jpeg", ".png"]);

function listDirs(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

function findFolder(exact) {
  const dirs = listDirs(sourceRoot);
  if (dirs.includes(exact)) return exact;
  // Fuzzy: normalize accents / encoding glitches
  const norm = (s) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "");
  const target = norm(exact);
  return dirs.find((d) => norm(d) === target || norm(d).includes(target.slice(0, 12)));
}

if (!fs.existsSync(sourceRoot)) {
  console.error("görseller klasörü bulunamadı:", sourceRoot);
  process.exit(1);
}

fs.mkdirSync(destRoot, { recursive: true });

const manifest = {};

for (const item of MAP) {
  const folderName = findFolder(item.folder);
  if (!folderName) {
    console.warn("Klasör bulunamadı:", item.folder);
    continue;
  }
  const srcDir = path.join(sourceRoot, folderName);
  const files = fs
    .readdirSync(srcDir)
    .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
    .map((f) => ({
      name: f,
      size: fs.statSync(path.join(srcDir, f)).size,
    }))
    .sort((a, b) => b.size - a.size);

  if (files.length === 0) {
    console.warn("Görsel yok:", folderName);
    continue;
  }

  const destDir = path.join(destRoot, item.slug);
  fs.mkdirSync(destDir, { recursive: true });

  const urls = [];
  files.forEach((file, i) => {
    const ext = path.extname(file.name).toLowerCase();
    const destName = `${String(i + 1).padStart(2, "0")}${ext}`;
    fs.copyFileSync(path.join(srcDir, file.name), path.join(destDir, destName));
    urls.push(`/images/products/${item.slug}/${destName}`);
  });

  manifest[item.slug] = urls;
  console.log(`OK ${item.slug} (${urls.length} görsel)`);
}

fs.writeFileSync(
  path.join(destRoot, "manifest.json"),
  JSON.stringify(manifest, null, 2),
  "utf8"
);

console.log("\nToplam ürün:", Object.keys(manifest).length);
console.log("Hedef:", destRoot);
