# CREED — Fine Timepieces & Accessories

An e-commerce storefront for a Bangladeshi watch retailer built with **Next.js 16** (App Router), **Tailwind CSS v4**, and a **SQLite** database (via `node:sqlite`).

## Features

- **Storefront** — product catalog, shop collections, search, product detail, cart drawer, bKash checkout, order tracking (`/order-status`).
- **Admin panel** (`/adminpanel`) — password-protected dashboard for orders, inventory/stock, products, blog (Journal), and homepage marketing posts, with printable invoices.
- **Order pipeline** — bKash TrxID capture → awaiting payment → confirmed → shipped → delivered, with optional courier + tracking number per order.

## Tech notes

- Database: built-in `node:sqlite` (`DatabaseSync`), auto-migrated and seeded on first run. File lives at `data/creed.db` locally (gitignored) and is persisted via **Netlify Blobs** on the live site.
- Persistence: `src/lib/storage.ts` downloads/upload the DB from a Netlify Blob store (`creed-store`, key `creed.db`) on serverless, and writes to `/tmp` on Netlify.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Admin login: `/adminpanel` (password from `ADMIN_PASSWORD` env; local default `creed-admin-2026`).

## Deploying

See [DEPLOY.md](DEPLOY.md) for the GitHub + Netlify walkthrough (including how the SQLite DB persists through Netlify Blobs).
