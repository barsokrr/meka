#!/bin/sh
set -x

export DATABASE_URL="${DATABASE_URL:-file:/data/prod.db}"
export HOSTNAME="0.0.0.0"

# Railway injects PORT — must match Networking domain port (usually 3000)
: "${PORT:=3000}"

mkdir -p /data

echo "=== Boot ==="
echo "PORT=$PORT"
echo "DATABASE_URL=$DATABASE_URL"
echo "NODE_ENV=$NODE_ENV"

# Schema first, then seed only when the catalog is empty (e.g. fresh Railway volume)
npx prisma db push --schema=/app/prisma/schema.prisma 2>&1 || true
SEED_IF_EMPTY=1 npx tsx prisma/seed.ts 2>&1 || true

echo "=== Starting Next.js ==="
exec node ./node_modules/next/dist/bin/next start -H 0.0.0.0 -p "$PORT"
