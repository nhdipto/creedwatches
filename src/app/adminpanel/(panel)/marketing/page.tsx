import { listMarketingPosts } from "@/lib/db";
import { formatDateTime } from "@/lib/admin";
import { MarketingForm } from "@/components/admin/marketing-form";
import { MarketingRowActions } from "@/components/admin/marketing-row-actions";

export const dynamic = "force-dynamic";

export default async function AdminMarketingPage() {
  const posts = await listMarketingPosts();

  return (
    <div>
      <h1 className="font-playfair text-2xl uppercase tracking-wide">Marketing posts</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Live posts appear as full-width banners on the homepage between the flash sale and
        testimonials.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="border border-zinc-200 bg-white">
            {posts.length === 0 ? (
              <p className="p-6 text-sm text-zinc-500">No marketing posts yet.</p>
            ) : (
              <ul className="divide-y divide-zinc-100">
                {posts.map((post) => (
                  <li key={post.id} className="flex items-start justify-between gap-4 p-5">
                    <div>
                      <p className="font-medium text-zinc-900">{post.title}</p>
                      <p className="mt-1 line-clamp-2 text-sm text-zinc-500">{post.body}</p>
                      {post.ctaText && post.ctaHref && (
                        <p className="mt-1 text-xs text-zinc-400">
                          {post.ctaText} → {post.ctaHref}
                        </p>
                      )}
                      <p className="mt-2 text-xs text-zinc-400">
                        Created {formatDateTime(post.createdAt)}
                      </p>
                    </div>
                    <MarketingRowActions id={post.id} active={post.active} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="border border-zinc-200 bg-white p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-900">
              New post
            </h2>
            <div className="mt-4">
              <MarketingForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
