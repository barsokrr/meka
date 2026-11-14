#!/usr/bin/env bash
# Yeni sunucuda tek komutla tam site (Docker gerekir)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker yok. Ubuntu için: https://docs.docker.com/engine/install/ubuntu/"
  exit 1
fi

if [[ ! -f .env ]]; then
  cp .env.example .env
  SECRET="$(openssl rand -hex 32 2>/dev/null || head -c 32 /dev/urandom | od -An -tx1 | tr -d ' \n')"
  if grep -q '^AUTH_SECRET=' .env; then
    sed -i "s|^AUTH_SECRET=.*|AUTH_SECRET=\"$SECRET\"|" .env
  fi
  echo ""
  echo ">>> .env oluşturuldu. NEXT_PUBLIC_SITE_URL değerini kendi domain veya IP:port ile güncelleyin."
  echo ">>> Örnek: https://site.barisoker.com veya http://SUNUCU_IP:3000"
  echo ""
  read -r -p "Devam etmek için Enter (önce .env düzenleyebilirsiniz)..."
fi

COMPOSE=(docker compose)
if ! docker compose version >/dev/null 2>&1; then
  COMPOSE=(docker-compose)
fi

"${COMPOSE[@]}" up -d --build
echo ""
echo "Site hazır. Port: ${MEKA_HTTP_PORT:-3000}"
echo "Admin: /admin/login (varsayılan seed — production'da şifreyi değiştirin)"
"${COMPOSE[@]}" ps