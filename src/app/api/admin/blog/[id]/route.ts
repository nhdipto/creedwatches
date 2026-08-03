import { NextResponse } from "next/server";
import { deleteBlogPost, updateBlogPost } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function PUT(request: Request, ctx: RouteContext<"/api/admin/blog/[id]">) {
  const { id } = await ctx.params;
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
    await updateBlogPost(Number(id), {
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

export async function DELETE(_request: Request, ctx: RouteContext<"/api/admin/blog/[id]">) {
  const { id } = await ctx.params;
  await deleteBlogPost(Number(id));
  return NextResponse.json({ ok: true });
}
