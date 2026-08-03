import { readFileSync, writeFileSync, mkdirSync, unlinkSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { getStore, type Store } from "@netlify/blobs";

const DB_BLOB_NAME = "creed.db";

let dbDir: string | null = null;
let lastRefresh = 0;

// The classic @netlify/plugin-nextjs Lambda does not always set NETLIFY=true,
// so detect Netlify through the Lambda environment too.
export function isNetlify(): boolean {
  if (process.env.NETLIFY_LOCAL) return false;
  return (
    process.env.NETLIFY === "true" ||
    process.env.CONTEXT === "production" ||
    process.env.CONTEXT === "branch-deploy" ||
    process.env.CONTEXT === "deploy-preview" ||
    Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME)
  );
}

// Serverless runtimes mount the app on a read-only filesystem (e.g. /var/task).
// Probe for a writable data directory and fall back to the OS temp dir.
function writableDir(): string {
  const dataDir = join(process.cwd(), "data");
  try {
    mkdirSync(dataDir, { recursive: true });
    const probe = join(dataDir, ".write-probe");
    writeFileSync(probe, "1");
    unlinkSync(probe);
    return dataDir;
  } catch {
    return tmpdir();
  }
}

function resolveDbDir(): string {
  if (dbDir === null) dbDir = isNetlify() ? tmpdir() : writableDir();
  return dbDir;
}

export function dbPath(): string {
  return join(resolveDbDir(), DB_BLOB_NAME);
}

async function store(): Promise<Store> {
  return getStore({ name: "creed-store" });
}

// Pulls the latest DB from Blobs on every request (debounced ~1s per instance).
// Serverless instances are otherwise stuck with the copy from their cold start,
// which makes admin edits appear to "roll back" on reload.
export async function ensureDbReady(): Promise<boolean> {
  if (!isNetlify()) return false;
  const now = Date.now();
  if (now - lastRefresh < 1000) return false;
  lastRefresh = now;
  try {
    const blob = await (await store()).get(DB_BLOB_NAME, { type: "arrayBuffer" });
    if (blob) {
      const path = dbPath();
      for (const suffix of ["-wal", "-shm"]) {
        try {
          rmSync(path + suffix, { force: true });
        } catch {
          // Ignore; SQLite tolerates leftover WAL files.
        }
      }
      writeFileSync(path, Buffer.from(blob));
      return true;
    }
  } catch {
    // Blob unavailable yet — the database is created/seeded locally, then persisted.
  }
  return false;
}

export async function persistDb(): Promise<void> {
  if (!isNetlify()) return;
  try {
    const data = readFileSync(dbPath());
    await (await store()).set(DB_BLOB_NAME, new Blob([data]));
  } catch {
    // Best-effort; the write already succeeded in the request's own database.
  }
}
