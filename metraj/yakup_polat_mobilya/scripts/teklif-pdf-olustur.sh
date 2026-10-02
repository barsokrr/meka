#!/usr/bin/env bash
# Basit teklif PDF — Chrome headless
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
HTML="$ROOT/public/mobilya/yakup-polat-teklif-basit.html"
PDF="$ROOT/public/mobilya/Yakup_Polat_Teklif_Formu.pdf"
CHROME="${CHROME:-/usr/local/bin/google-chrome}"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$PDF" "file://$HTML" 2>/dev/null || true
test -s "$PDF" && echo "OK: $PDF" || { echo "PDF oluşturulamadı"; exit 1; }
