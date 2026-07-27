#!/bin/sh
set -e

export DATABASE_URL="${DATABASE_URL:-file:/data/prod.db}"
export HOSTNAME="${HOSTNAME:-0.0.0.0}"
export PORT="${PORT:-3000}"

mkdir -p /data

echo "Running prisma db push..."
node ./node_modules/prisma/build/index.js db push --schema=./prisma/schema.prisma

echo "Starting server on port ${PORT}..."
exec node server.js
