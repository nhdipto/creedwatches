import { notFound } from "next/navigation";
import { resolveCollection } from "@/lib/catalog";
import { CollectionBrowser } from "@/components/collection/collection-browser";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const collection = await resolveCollection(slug);
  if (!collection) notFound();

  return (
    <CollectionBrowser
      products={collection.products}
      title={collection.title}
      description={collection.description}
    />
  );
}
