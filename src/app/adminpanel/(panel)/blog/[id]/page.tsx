import Link from "next/link";
import { notFound } from "next/navigation";
import { listBlogPosts } from "@/lib/db";
import { BlogPostForm } from "@/components/admin/blog-form";

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = (await listBlogPosts()).find((p) => p.id === Number(id));
  if (!post) notFound();

  return (
    <div>
      <Link
        href="/adminpanel/blog"
        className="text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-900"
      >
        &larr; Back to blog
      </Link>
      <h1 className="mt-3 font-playfair text-2xl uppercase tracking-wide">Edit post</h1>
      <p className="mt-1 text-sm text-zinc-500">{post.title}</p>
      <div className="mt-8 border border-zinc-200 bg-white p-6 md:p-8">
        <BlogPostForm postId={post.id} initial={post} />
      </div>
    </div>
  );
}
