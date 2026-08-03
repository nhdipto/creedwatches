import { readFileSync, writeFileSync, mkdirSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { getStore, type Store } from "@netlify/blobs";

const DB_BLOB_NAME = "creed.db";

let dbDir: string | null = null;
let initialized = false;

// The classic @netlify/plugin-nextjs Lambda does not always set NETLIFY=true,
// so detect Netlify through the Lambda environment too.
function isNetlify(): boolean {
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

export async function ensureDbReady(): Promise<void> {
  if (initialized || !isNetlify()) return;
  try {
    const blob = await (await store()).get(DB_BLOB_NAME, { type: "arrayBuffer" });
    if (blob) {
      writeFileSync(dbPath(), Buffer.from(blob));
    }
  } catch {
    // No blob yet — the database will be created and seeded locally, then persisted.
  }
  initialized = true;
}

export async function persistDb(): Promise<void> {
  if (!isNetlify()) return;
  try {
    const data = readFileSync(dbPath());
    await (await store()).set(DB_BLOB_NAME, new Blob([data]));
  } catch {
    // Persistence failures are logged by Netlify; the request still succeeds locally.
  }
}
