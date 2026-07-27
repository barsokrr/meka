#!/bin/sh
export DATABASE_URL="${DATABASE_URL:-file:/data/prod.db}"
export HOSTNAME="0.0.0.0"
export PORT="${PORT:-3000}"

mkdir -p /data

echo "=== Boot ==="
echo "PORT=$PORT"
echo "DATABASE_URL=$DATABASE_URL"

npx prisma db push --schema=/app/prisma/schema.prisma || echo "db push warning (continuing)"

echo "=== Starting Next.js on 0.0.0.0:$PORT ==="
exec npx next start -H 0.0.0.0 -p "$PORT"
