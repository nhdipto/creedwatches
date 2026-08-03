import Link from "next/link";
import { listBlogPosts } from "@/lib/db";
import { BlogRowActions } from "@/components/admin/blog-row-actions";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await listBlogPosts();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair text-2xl uppercase tracking-wide">Blog management</h1>
          <p className="mt-1 text-sm text-zinc-500">
            {posts.length} posts. Publish, edit or delete articles on the Journal.
          </p>
        </div>
        <Link
          href="/adminpanel/blog/new"
          className="bg-zinc-950 px-6 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-zinc-800"
        >
          New post
        </Link>
      </div>

      <div className="mt-8 border border-zinc-200 bg-white">
        {posts.length === 0 ? (
          <p className="p-6 text-sm text-zinc-500">No blog posts yet.</p>
        ) : (
          <ul className="divide-y divide-zinc-100">
            {posts.map((post) => (
              <li key={post.id} className="flex items-start justify-between gap-4 p-5">
                <div>
                  <Link
                    href={`/adminpanel/blog/${post.id}`}
                    className="font-medium text-zinc-900 underline-offset-2 hover:underline"
                  >
                    {post.title}
                  </Link>
                  <p className="mt-1 text-xs text-zinc-400">
                    {post.category} · {post.date} · {post.readTime}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">{post.excerpt}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <BlogRowActions id={post.id} published={post.published} />
                  <Link
                    href={`/adminpanel/blog/${post.id}`}
                    className="text-sm text-zinc-600 underline-offset-2 hover:underline"
                  >
                    Edit →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
