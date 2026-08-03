import { NextResponse } from "next/server";
import { insertBlogPost } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    slug?: string;
    title?: string;
    excerpt?: string;
    category?: string;
    date?: string;
    readTime?: string;
    image?: string;
    author?: string;
    content?: string;
    published?: boolean;
  };
  const title = (body.title ?? "").trim();
  if (!title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }
  try {
    await insertBlogPost({
      slug: (body.slug ?? "").trim(),
      title,
      excerpt: (body.excerpt ?? "").trim(),
      category: (body.category ?? "Journal").trim(),
      date: (body.date ?? new Date().toISOString().slice(0, 10)),
      readTime: (body.readTime ?? "5 min read"),
      image: (body.image ?? "/images/products/product-01.jpg"),
      author: (body.author ?? "CREED Editorial").trim(),
      content: (body.content ?? "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      published: body.published !== false,
    });
  } catch {
    return NextResponse.json(
      { error: "A post with this slug already exists. Choose a different slug." },
      { status: 409 },
    );
  }
  return NextResponse.json({ ok: true });
}
