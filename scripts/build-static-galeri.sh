#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/.static-galeri-site"
rm -rf "$OUT"
mkdir -p "$OUT/galeri" "$OUT/images"
cp -r "$ROOT/public/images/interior-design" "$OUT/images/"
node "$ROOT/scripts/render-static-galeri.mjs" > "$OUT/galeri/index.html"
node "$ROOT/scripts/render-static-landing.mjs" > "$OUT/index.html"
echo "Built: $OUT"
