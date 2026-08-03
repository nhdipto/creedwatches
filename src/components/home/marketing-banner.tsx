import Link from "next/link";
import { listMarketingPosts } from "@/lib/db";

export async function MarketingBanner() {
  const posts = (await listMarketingPosts()).filter((p) => p.active);
  if (posts.length === 0) return null;

  return (
    <section className="bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          {posts.map((post) => (
            <div key={post.id}>
              <h2 className="font-playfair text-2xl uppercase tracking-wide md:text-3xl">
                {post.title}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400">{post.body}</p>
              {post.ctaText && post.ctaHref && (
                <Link
                  href={post.ctaHref}
                  className="mt-6 inline-block border border-white px-8 py-3 text-sm font-medium uppercase tracking-widest transition-colors hover:bg-white hover:text-zinc-950"
                >
                  {post.ctaText}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
