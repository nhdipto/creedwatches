import Image from "next/image";
import Link from "next/link";
import { listBlogPosts, type BlogPostRow } from "@/lib/db";
import { ArrowRightIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Beyond the Dial | CREED Blog",
  description:
    "Stories, guides and honest reviews from the CREED editorial team — from automatic movement care to the dials everyone's asking about.",
};

function PostCard({ post, large = false }: { post: BlogPostRow; large?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex flex-col ${large ? "lg:flex-row lg:gap-8" : ""}`}
    >
      <div
        className={`relative overflow-hidden bg-zinc-100 ${large ? "aspect-[16/10] lg:aspect-[16/9] lg:flex-1" : "aspect-[16/10]"}`}
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes={large ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className={large ? "flex flex-col justify-center lg:flex-1" : "pt-5"}>
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
          <span>{post.date}</span>
          <span className="h-1 w-1 rounded-full bg-zinc-300" />
          <span>{post.category}</span>
          <span className="h-1 w-1 rounded-full bg-zinc-300" />
          <span>{post.readTime}</span>
        </p>
        <h3
          className={`mt-3 font-display font-semibold leading-snug tracking-wide text-black transition-colors group-hover:text-zinc-600 ${
            large ? "text-2xl sm:text-3xl" : "text-xl"
          }`}
        >
          {post.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-500">{post.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black">
          Read more
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export default async function BlogPage() {
  const allPosts = (await listBlogPosts()).filter((p) => p.published);
  const [featured, ...rest] = allPosts;

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <div className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-400">
          CREED Editorial
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-wide text-black sm:text-5xl">
          Beyond the Dial.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500">
          Stories, guides and honest reviews from the people behind CREED. For the
          collectors, the curious and the soon-to-be first-time buyers.
        </p>
      </div>

      <div className="mt-12">
        <PostCard post={featured} large />
      </div>

      <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
