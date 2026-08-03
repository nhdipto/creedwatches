import { BlogPostForm } from "@/components/admin/blog-form";

export const dynamic = "force-dynamic";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="font-playfair text-2xl uppercase tracking-wide">New blog post</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Write a new article for the Journal.
      </p>
      <div className="mt-8 border border-zinc-200 bg-white p-6 md:p-8">
        <BlogPostForm />
      </div>
    </div>
  );
}
