import fs from "fs";
import path from "path";
import sharp from "sharp";

const PRODUCTS_DIR = path.join(process.cwd(), "public", "images", "products");
const BACKUP_DIR = path.join(PRODUCTS_DIR, "_originals");

const IMAGE_EXT = new Set([".webp", ".jpg", ".jpeg", ".png"]);

function collectImages(dir: string): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith("_")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectImages(full));
    } else if (IMAGE_EXT.has(path.extname(entry.name).toLowerCase())) {
      results.push(full);
    }
  }
  return results;
}

function backupFile(filePath: string) {
  const rel = path.relative(PRODUCTS_DIR, filePath);
  const dest = path.join(BACKUP_DIR, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (!fs.existsSync(dest)) {
    fs.copyFileSync(filePath, dest);
  }
}

async function stylizeImage(filePath: string, index: number) {
  const ext = path.extname(filePath).toLowerCase();
  const meta = await sharp(filePath).metadata();
  const w = meta.width ?? 1400;
  const h = meta.height ?? 1400;

  const crop = 0.028;
  const shiftX = (index % 4) * 0.004;
  const shiftY = (index % 3) * 0.004;
  const left = Math.max(0, Math.floor(w * (crop + shiftX)));
  const top = Math.max(0, Math.floor(h * (crop + shiftY)));
  const width = Math.min(w - left, Math.floor(w * (1 - 2 * crop - shiftX)));
  const height = Math.min(h - top, Math.floor(h * (1 - 2 * crop - shiftY)));

  let pipeline = sharp(filePath)
    .rotate()
    .extract({ left, top, width, height })
    .recomb([
      [1.04, 0.03, 0.01],
      [0.02, 1.0, 0.01],
      [0.0, 0.02, 0.96],
    ])
    .modulate({ brightness: 1.03, saturation: 0.84 })
    .linear(1.06, -10)
    .sharpen({ sigma: 0.55, m1: 0.4, m2: 0.25 });

  const base = await pipeline.toBuffer();

  const vignetteSvg = Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="v" cx="50%" cy="48%" r="72%">
          <stop offset="55%" stop-color="#ffffff" stop-opacity="0"/>
          <stop offset="100%" stop-color="#2a2420" stop-opacity="0.22"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#v)"/>
    </svg>`
  );

  const output = sharp(base).composite([{ input: vignetteSvg, blend: "multiply" }]);

  const tempPath = `${filePath}.tmp`;

  if (ext === ".jpg" || ext === ".jpeg") {
    await output.jpeg({ quality: 88, mozjpeg: true }).toFile(tempPath);
  } else if (ext === ".png") {
    await output.png({ quality: 90, compressionLevel: 9 }).toFile(tempPath);
  } else {
    await output.webp({ quality: 88, effort: 4 }).toFile(tempPath);
  }

  try {
    fs.copyFileSync(tempPath, filePath);
  } finally {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
  }
}

async function main() {
  const onlyArg = process.argv.find((a) => a.startsWith("--only="));
  const onlyFiles = onlyArg
    ? onlyArg
        .slice(7)
        .split(",")
        .map((p) => path.join(PRODUCTS_DIR, p.replace(/^\//, "")))
    : null;

  const files = onlyFiles ?? collectImages(PRODUCTS_DIR);
  console.log(`Found ${files.length} images.`);

  if (!onlyFiles) {
    for (const file of files) {
      backupFile(file);
    }
    console.log(`Backups saved to ${BACKUP_DIR}`);
  }

  let ok = 0;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    try {
      await stylizeImage(file, i);
      ok++;
      console.log(`[${i + 1}/${files.length}] ${path.relative(PRODUCTS_DIR, file)}`);
    } catch (err) {
      console.error(`Failed: ${file}`, err);
    }
  }

  console.log(`\nDone. Processed ${ok}/${files.length} images.`);
  console.log("Style: warm neutral recomb, -16% saturation, 2.8% crop, soft vignette.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
