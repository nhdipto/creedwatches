import Link from "next/link";
import { notFound } from "next/navigation";
import { adminGetProduct } from "@/lib/db";
import { ProductForm } from "@/components/admin/product-form";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await adminGetProduct(id);
  if (!product) notFound();

  return (
    <div>
      <Link
        href="/adminpanel/products"
        className="text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-900"
      >
        &larr; Back to products
      </Link>
      <h1 className="mt-3 font-playfair text-2xl uppercase tracking-wide">Edit product</h1>
      <p className="mt-1 text-sm text-zinc-500">{product.name}</p>
      <div className="mt-8 border border-zinc-200 bg-white p-6 md:p-8">
        <ProductForm productId={product.id} initial={product} />
      </div>
    </div>
  );
}
