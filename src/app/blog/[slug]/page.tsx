import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, listBlogPosts } from "@/lib/db";
import { ArrowRightIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(async ({ slug }) => {
    const post = await getBlogPostBySlug(slug);
    if (!post) return { title: "Article not found | CREED" };
    return { title: `${post.title} | CREED Blog`, description: post.excerpt };
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post || !post.published) notFound();

  const more = (await listBlogPosts())
    .filter((p) => p.slug !== slug && p.published)
    .slice(0, 3);

  return (
    <article className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-10">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-500 transition-colors hover:text-black"
      >
        <ArrowRightIcon className="h-4 w-4 rotate-180" />
        Back to blog
      </Link>

      <div className="mx-auto mt-10 max-w-3xl">
        <p className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
          <span>{post.category}</span>
          <span className="h-1 w-1 rounded-full bg-zinc-300" />
          <span>{post.date}</span>
          <span className="h-1 w-1 rounded-full bg-zinc-300" />
          <span>{post.readTime}</span>
        </p>
        <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-wide text-black sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-sm font-medium uppercase tracking-widest text-zinc-500">
          By {post.author}
        </p>
      </div>

      <div className="relative mt-10 aspect-[16/9] overflow-hidden bg-zinc-100">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </div>

      <div className="mx-auto mt-12 max-w-3xl space-y-6">
        {post.content.map((paragraph, i) => (
          <p
            key={i}
            className={`leading-relaxed text-zinc-700 ${i === 0 ? "text-lg text-zinc-900" : "text-base"}`}
          >
            {paragraph}
          </p>
        ))}

        <div className="mt-10 border border-zinc-200 bg-zinc-50 p-6">
          <p className="font-display text-xl font-semibold text-black">
            Looking for one of these watches?
          </p>
          <p className="mt-2 text-sm text-zinc-600">
            Shop the full CREED collection online with nationwide delivery, or visit a
            store to see them in person.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="bg-black px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-zinc-800"
            >
              Shop all watches
            </Link>
            <Link
              href="/stores"
              className="border border-zinc-900 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white"
            >
              Find a store
            </Link>
          </div>
        </div>
      </div>

      {more.length > 0 && (
        <div className="mt-16 border-t border-zinc-200 pt-10">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
            Keep Reading
          </h2>
          <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-3">
            {more.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  {p.date} · {p.category}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-black transition-colors group-hover:text-zinc-600">
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
