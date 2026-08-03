import { Suspense } from "react";
import Link from "next/link";
import { listCatalog } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { SearchBox } from "@/components/search/search-box";

export const metadata = {
  title: "Search | CREED",
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ");
}

async function SearchResults({ q }: { q: string }) {
  const products = await listCatalog();
  const query = normalize(q);
  const matches = query
    ? products.filter((p) =>
        [p.brand, p.name, p.sku, p.strap, p.dial, p.movement, p.category, p.gender]
          .map(normalize)
          .some((field) => field.includes(query)),
      )
    : products;

  return (
    <div>
      <p className="text-sm text-zinc-500">
        <span className="font-semibold text-black">{matches.length}</span>{" "}
        {matches.length === 1 ? "result" : "results"}
        {query && (
          <>
            {" "}
            for <span className="font-medium text-zinc-900">&ldquo;{q}&rdquo;</span>
          </>
        )}
      </p>

      {matches.length === 0 ? (
        <div className="mt-6 flex flex-col items-center justify-center border border-zinc-200 px-6 py-20 text-center">
          <p className="font-display text-xl text-zinc-900">Nothing found for &ldquo;{q}&rdquo;</p>
          <p className="mt-2 max-w-sm text-sm text-zinc-500">
            Try a brand name like &ldquo;Seiko&rdquo;, a type like &ldquo;automatic&rdquo;, or
            browse the full catalogue instead.
          </p>
          <Link
            href="/shop"
            className="mt-6 border border-zinc-900 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors hover:bg-zinc-900 hover:text-white"
          >
            Browse all watches
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
          {matches.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <div className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-400">
          Search CREED
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-wide text-black sm:text-4xl">
          Find Your Watch.
        </h1>
      </div>

      <div className="mx-auto mt-8 max-w-xl">
        <SearchBox initialQuery={q} />
      </div>

      <div className="mt-10">
        <Suspense fallback={<p className="text-sm text-zinc-400">Searching…</p>}>
          <SearchResults q={q} />
        </Suspense>
      </div>
    </div>
  );
}
