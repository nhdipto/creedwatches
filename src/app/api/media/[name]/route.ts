import { NextResponse } from "next/server";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getStore } from "@netlify/blobs";
import { isNetlify } from "@/lib/storage";

export const dynamic = "force-dynamic";

const CONTENT_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  avif: "image/avif",
};

export async function GET(
  _request: Request,
  ctx: { params: Promise<{ name: string }> },
) {
  const { name } = await ctx.params;
  if (!/^[a-zA-Z0-9.-]+$/.test(name)) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  const fallbackType = CONTENT_TYPES[ext] ?? "application/octet-stream";

  if (isNetlify()) {
    const entry = await getStore({ name: "creed-media" }).getWithMetadata(name, {
      type: "arrayBuffer",
    });
    if (!entry) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }
    return new Response(new Uint8Array(entry.data), {
      headers: {
        "Content-Type": String(entry.metadata?.contentType ?? fallbackType),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  try {
    const data = readFileSync(join(process.cwd(), "public", "uploads", name));
    return new Response(new Uint8Array(data), {
      headers: {
        "Content-Type": fallbackType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
}
