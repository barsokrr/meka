#!/bin/sh
set -x

DEFAULT_DB="file:/data/prod.db"
VOLUME_DIR="${RAILWAY_VOLUME_MOUNT_PATH:-}"

# Keep the SQLite file on the attached volume; container storage is wiped on redeploy
if [ -n "$VOLUME_DIR" ] && { [ -z "$DATABASE_URL" ] || [ "$DATABASE_URL" = "$DEFAULT_DB" ]; }; then
  DATABASE_URL="file:$(echo "$VOLUME_DIR" | sed 's|/$||')/prod.db"
fi

export DATABASE_URL="${DATABASE_URL:-$DEFAULT_DB}"
export HOSTNAME="0.0.0.0"

# Railway injects PORT — must match Networking domain port (usually 3000)
: "${PORT:=3000}"

DB_DIR=$(dirname "$(echo "$DATABASE_URL" | sed 's|^file:||')")
mkdir -p "$DB_DIR"

echo "=== Boot ==="
echo "PORT=$PORT"
echo "DATABASE_URL=$DATABASE_URL"
echo "NODE_ENV=$NODE_ENV"

if [ -z "$VOLUME_DIR" ]; then
  echo "UYARI: Railway kalici disk bagli degil. $DB_DIR container icinde tutuluyor;"
  echo "UYARI: her yeni deploy siparis ve mesajlari siler. Railway > Volumes ile /data baglayin."
fi

# Schema first, then seed only when the catalog is empty (e.g. fresh volume)
npx prisma db push --schema=/app/prisma/schema.prisma 2>&1 || true
SEED_IF_EMPTY=1 npx tsx prisma/seed.ts 2>&1 || true

echo "=== Starting Next.js ==="
exec node ./node_modules/next/dist/bin/next start -H 0.0.0.0 -p "$PORT"
