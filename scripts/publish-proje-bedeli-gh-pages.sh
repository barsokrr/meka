#!/usr/bin/env bash
# public/proje-bedeli → gh-pages/proje-bedeli (tam sayfa hesaplayıcı)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

git fetch origin gh-pages main

git clone --depth 1 --branch gh-pages "$(
  git -C "$ROOT" remote get-url origin
)" "$WORK/site"

node "$ROOT/scripts/build-proje-bedeli-tek-dosya.mjs"
rm -rf "$WORK/site/proje-bedeli"
mkdir -p "$WORK/site/proje-bedeli"
cp -a "$ROOT/public/proje-bedeli/." "$WORK/site/proje-bedeli/"

cd "$WORK/site"
git add proje-bedeli
if git diff --staged --quiet; then
  echo "gh-pages: proje-bedeli değişiklik yok"
  exit 0
fi
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git config user.name "github-actions[bot]"
git commit -m "Publish proje bedeli hesaplayıcı (iç mimarlık algoritması)"
git push origin gh-pages

echo "OK: https://cdn.jsdelivr.net/gh/barsokrr/meka@gh-pages/proje-bedeli/index.html?k=benimhesap2026"
echo "Kalıcı (Pages açıksa): https://barsokrr.github.io/meka/proje-bedeli/?k=benimhesap2026"
