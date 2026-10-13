#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/.static-galeri-site"
rm -rf "$OUT"
mkdir -p "$OUT/galeri" "$OUT/images"
cp -r "$ROOT/public/images/interior-design" "$OUT/images/"
node "$ROOT/scripts/render-static-galeri.mjs" > "$OUT/galeri/index.html"
cat > "$OUT/index.html" <<'HTML'
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="refresh" content="0; url=galeri/" />
  <title>Barış Öker — Galeri</title>
</head>
<body>
  <p><a href="galeri/">Proje galerisine git</a></p>
</body>
</html>
HTML
echo "Built: $OUT"
