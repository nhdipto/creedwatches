import { NextResponse } from "next/server";
import { insertMarketingPost } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    title?: string;
    body?: string;
    ctaText?: string;
    ctaHref?: string;
    active?: boolean;
  };
  const title = (body.title ?? "").trim();
  if (!title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }
  await insertMarketingPost({
    title,
    body: (body.body ?? "").trim(),
    ctaText: (body.ctaText ?? "").trim(),
    ctaHref: (body.ctaHref ?? "").trim(),
    active: body.active !== false,
  });
  return NextResponse.json({ ok: true });
}
