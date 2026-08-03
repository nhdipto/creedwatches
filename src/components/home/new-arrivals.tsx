import Link from "next/link";
import { newArrivals } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { ArrowRightIcon } from "@/components/icons";

export async function NewArrivals() {
  const items = await newArrivals();

  return (
    <section className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-400">
            Latest Drops!
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-wide text-black sm:text-4xl">
            New This Week.
          </h2>
        </div>
        <Link
          href="/shop/new-arrivals"
          className="inline-flex shrink-0 items-center gap-2 border border-zinc-900 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white"
        >
          View all
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
