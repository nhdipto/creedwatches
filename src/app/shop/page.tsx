import { resolveCollection } from "@/lib/catalog";
import { CollectionBrowser } from "@/components/collection/collection-browser";

export const metadata = {
  title: "Shop All Watches | CREED",
  description:
    "Browse the full CREED catalogue — heritage brands, modern microbrands and couple sets, with nationwide delivery across Bangladesh.",
};

export default async function ShopPage() {
  const collection = await resolveCollection([]);
  if (!collection) return null;
  return (
    <CollectionBrowser
      products={collection.products}
      title={collection.title}
      description={collection.description}
    />
  );
}
