import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatTk } from "@/lib/products";
import { galleryFor, getProduct, listCatalog } from "@/lib/catalog";
import { ProductDetail } from "@/components/product/product-detail";
import { ProductCard } from "@/components/product-card";
import { SectionHeader } from "@/components/section-header";

export const dynamic = "force-dynamic";

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(async ({ slug }) => {
    const product = await getProduct(slug);
    if (!product) return { title: "Product not found | CREED" };
    return {
      title: `${product.name} | CREED`,
      description: `${product.name} — ${formatTk(product.price)}. ${product.description}`,
    };
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const all = await listCatalog();
  const related = all
    .filter((p) => p.id !== product.id)
    .filter((p) => p.brandSlug === product.brandSlug || p.gender === product.gender)
    .slice(0, 4);

  return (
    <>
      <ProductDetail product={product} gallery={galleryFor(product)} />

      {related.length > 0 && (
        <section className="mx-auto max-w-screen-2xl border-t border-zinc-200 px-4 py-16 sm:px-6 lg:px-10">
          <SectionHeader
            eyebrow="Complete the look"
            title="You May Also Like."
            sub="Pieces that pair perfectly with what you've just found."
          />
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
