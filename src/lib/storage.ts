import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { getStore, type Store } from "@netlify/blobs";

const DB_BLOB_NAME = "creed.db";

function isNetlify(): boolean {
  return process.env.NETLIFY === "true" && !process.env.NETLIFY_LOCAL;
}

let initialized = false;

export function dbPath(): string {
  const dir = isNetlify() ? tmpdir() : join(process.cwd(), "data");
  return join(dir, DB_BLOB_NAME);
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
