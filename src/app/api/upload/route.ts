import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomUUID } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { getStore } from "@netlify/blobs";
import { ADMIN_COOKIE } from "@/lib/admin";
import { isNetlify } from "@/lib/storage";

export const dynamic = "force-dynamic";

const MAX_BYTES = 5 * 1024 * 1024;

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
};

export async function POST(request: Request) {
  if ((await cookies()).get(ADMIN_COOKIE)?.value !== "1") {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  const ext = ALLOWED_TYPES[file.type.toLowerCase()];
  if (!ext) {
    return NextResponse.json(
      { error: "Unsupported file type. Use JPG, PNG, WebP, GIF or AVIF." },
      { status: 400 },
    );
  }
  if (file.size <= 0 || file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image must be between 0 and 5 MB." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const key = `${randomUUID()}${ext}`;

  if (isNetlify()) {
    await getStore({ name: "creed-media" }).set(key, new Blob([buffer]), {
      metadata: { contentType: file.type.toLowerCase() },
    });
  } else {
    const dir = join(process.cwd(), "public", "uploads");
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, key), buffer);
  }

  return NextResponse.json({ url: `/api/media/${key}` });
}
