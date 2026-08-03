# Deploying CREED to GitHub + Netlify

This walks you through putting the project on GitHub and going live on Netlify,
including how the SQLite database persists through **Netlify Blobs**.

## Before you start

- Install **Git for Windows** from https://git-scm.com/download/win (accept all defaults).
  After installing, open a fresh terminal and confirm it works: `git --version`
- You will need a **GitHub account** (https://github.com/signup) and a **Netlify account**
  (https://app.netlify.com/signup — sign in with GitHub to make this easiest).

## Part 1 — Push the code to GitHub

Open a terminal in the project folder (`C:\CW\creed-store`):

```powershell
git init
git add .
git commit -m "Initial commit: CREED watch store"
```

Then create the repository on GitHub:

1. Go to https://github.com/new
2. Name: `creed-store` (keep it Public or Private — either works)
3. Do NOT tick "Add a README", ".gitignore", or "license" (they already exist)
4. Click **Create repository**

Back in your terminal, add the new repo as the remote and push. GitHub shows these
commands after you create the repo — they look like:

```powershell
git branch -M main
git remote add origin https://github.com/<your-username>/creed-store.git
git push -u origin main
```

Replace `<your-username>` with your GitHub username. If you set up a PAT/SSH instead,
use the URL GitHub printed on the repo page.

> The local database (`data/creed.db`) is **gitignored**, so it will NOT be uploaded.
> On Netlify the database is created fresh from the seed data on first run and then
> persisted to Netlify Blobs.

## Part 2 — Go live on Netlify

1. Go to https://app.netlify.com
2. Click **Add new site → Import an existing project**
3. Choose **GitHub**, authorize Netlify, and select the `creed-store` repository
4. Netlify auto-detects the build settings from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 24 (from `.nvmrc`)
5. Before deploying, add the environment variable under
   **Site configuration → Environment variables**:
   - Key: `ADMIN_PASSWORD`, Value: pick a strong password for `/adminpanel` login
6. Click **Deploy site**. The first build takes a minute or two.

Your site URL will be something like `https://creed-store-1234.netlify.app`.
You can change it later under **Site configuration → Domain management**.

### What happens with the database

- **Build time:** `next build` creates a fresh seeded DB in the build container and
  pre-renders the static pages.
- **First request on the live site:** the serverless function checks Netlify Blobs
  (store `creed-store`, key `creed.db`). No blob exists yet, so it creates + seeds a
  fresh SQLite DB in `/tmp` and writes it to Blobs.
- **Every write (new order, status change, stock edit, marketing post, blog post):**
  the DB is checkpointed and re-uploaded to Blobs. Later requests download the latest
  copy. This is why the DB file lives in `/tmp` on Netlify (functions can't write to
  `process.cwd()`).

### Local development note

Running `npm run dev` locally uses the regular `data/creed.db` file and never touches
Blobs. Netlify-specific behavior is gated behind `NETLIFY=true` (set only in the
Netlify build/runtime). If you test locally with `netlify dev`, set `NETLIFY_LOCAL=true`
in your environment so it keeps using the local file instead of Blobs.

## Admin panel

- URL: `/adminpanel`
- Password: the `ADMIN_PASSWORD` env var you set on Netlify (default for local dev:
  `creed-admin-2026`)

## What's next after launch

- **SteadFast courier integration** (create order + tracking status lookup) — deliberately
  deferred until after launch.
- Demo the site to your friend at the live URL.
