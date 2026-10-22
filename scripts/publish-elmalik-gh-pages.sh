#!/usr/bin/env bash
# public/elmalik → gh-pages/elmalik (GitHub Pages branch deploy)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

git fetch origin gh-pages main

git clone --depth 1 --branch gh-pages "$(
  git -C "$ROOT" remote get-url origin
)" "$WORK/site"

rm -rf "$WORK/site/elmalik"
mkdir -p "$WORK/site/elmalik"
cp -a "$ROOT/public/elmalik/." "$WORK/site/elmalik/"

cd "$WORK/site"
git add elmalik
if git diff --staged --quiet; then
  echo "gh-pages: elmalik değişiklik yok"
  exit 0
fi
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git config user.name "github-actions[bot]"
git commit -m "Publish elmalik hakediş mobil portal"
git push origin gh-pages

echo "OK: https://barsokrr.github.io/meka/elmalik/ (Pages açıksa)"
