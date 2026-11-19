# AGENTS.md

## Cursor Cloud specific instructions

This is a single Next.js 15 (App Router) + Prisma (SQLite) application — a Turkish
interior-design order-request site ("Barış Öker"). There is one service; standard
commands live in `README.md` and `package.json` `scripts`.

### Environment / setup notes (non-obvious)

- `.env` is git-ignored and required. Create it once with `cp .env.example .env`;
  the default values work for local dev (SQLite, dummy `AUTH_SECRET`). SMTP is
  optional — when unset, order emails are logged to the console instead of sent.
- The database is a local SQLite file (`dev.db`, git-ignored). The Prisma client
  must be generated after any fresh dependency install (`npx prisma generate`);
  the startup update script handles this.
- First-time DB init: `npm run db:setup` (runs `prisma db push` then seeds).

### Running / testing

- Dev server: `npm run dev` (http://localhost:3000). Do NOT use `npm run build` /
  `npm start` for development.
- Lint: `npm run lint`. Build (verify): `npm run build` (runs `prisma generate`
  first).
- Admin panel: http://localhost:3000/admin/login — seeded credentials are
  `admin@barisoker.com` / `BarisOker2026!`.
- Core flow to smoke-test: browse `/urunler` → add to cart → `/sepet` →
  `/siparis` → confirmation at `/siparis/onay` (order numbers look like
  `BO-2026-0001`).

### Gotcha: seeding is destructive by default

- `npm run db:setup` and `npm run db:seed` run `seedFromScratch`, which
  **deletes all orders, products, messages, and settings** before re-seeding.
  To seed without wiping existing data (e.g. keep placed orders), use the
  non-destructive path: `SEED_IF_EMPTY=1 npm run db:seed`.
