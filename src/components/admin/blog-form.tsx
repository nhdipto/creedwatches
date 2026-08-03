"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugifyBrand } from "@/lib/products";

const IMAGE_OPTIONS = Array.from({ length: 37 }, (_, i) =>
  i < 13 ? `/images/products/product-${String(i + 1).padStart(2, "0")}.jpg` : `/images/products/img-${i + 1}.jpg`,
);

export function BlogPostForm({
  postId,
  initial,
}: {
  postId?: number;
  initial?: {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    author: string;
    content: string[];
    published: boolean;
  } | null;
}) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    excerpt: initial?.excerpt ?? "",
    category: initial?.category ?? "Journal",
    date: initial?.date ?? new Date().toISOString().slice(0, 10),
    readTime: initial?.readTime ?? "5 min read",
    image: initial?.image ?? "/images/products/product-01.jpg",
    author: initial?.author ?? "CREED Editorial",
    content: initial?.content.join("\n") ?? "",
    published: initial?.published ?? true,
  });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const set = (key: keyof typeof form) => (value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch(postId ? `/api/admin/blog/${postId}` : "/api/admin/blog", {
        method: postId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, slug: form.slug.trim() || slugifyBrand(form.title) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save post.");
      router.push("/adminpanel/blog");
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const inputClass =
    "w-full border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-zinc-900";
  const labelClass = "mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-500";

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div>
          <label className={labelClass}>Title *</label>
          <input
            required
            value={form.title}
            onChange={(e) => {
              set("title")(e.target.value);
              if (!postId && !form.slug) set("slug")(slugifyBrand(e.target.value));
            }}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Slug</label>
          <input value={form.slug} onChange={(e) => set("slug")(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Excerpt</label>
          <textarea
            value={form.excerpt}
            onChange={(e) => set("excerpt")(e.target.value)}
            rows={3}
            className={inputClass}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Category</label>
            <input value={form.category} onChange={(e) => set("category")(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Author</label>
            <input value={form.author} onChange={(e) => set("author")(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Date</label>
            <input type="date" value={form.date} onChange={(e) => set("date")(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Read time</label>
            <input value={form.readTime} onChange={(e) => set("readTime")(e.target.value)} className={inputClass} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className={labelClass}>Cover image</label>
          <select value={form.image} onChange={(e) => set("image")(e.target.value)} className={inputClass}>
            {IMAGE_OPTIONS.map((src) => (
              <option key={src} value={src}>
                {src}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Content (one paragraph per line)</label>
          <textarea
            value={form.content}
            onChange={(e) => set("content")(e.target.value)}
            rows={10}
            className={inputClass}
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => set("published")(e.target.checked)}
            className="h-4 w-4 accent-zinc-900"
          />
          Published (visible on the blog)
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={busy}
            className="bg-zinc-950 px-6 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-zinc-800 disabled:opacity-60"
          >
            {busy ? "Saving..." : postId ? "Save changes" : "Create post"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/adminpanel/blog")}
            className="border border-zinc-300 px-6 py-3 text-sm font-medium uppercase tracking-widest text-zinc-900 hover:border-zinc-900"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
