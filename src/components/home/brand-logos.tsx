import Link from "next/link";
import { SectionHeader } from "@/components/section-header";
import { brands } from "@/lib/products";

export function BrandLogos() {
  return (
    <section className="bg-zinc-50 py-16 lg:py-20">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10">
        <SectionHeader
          eyebrow="Heritage names. Modern icons."
          title="Global Brands With Distinct Identities."
          sub="Explore curated collections from the names we carry — authorized and original."
        />

        <div className="mt-12 grid grid-cols-2 gap-px bg-zinc-200 sm:grid-cols-3 lg:grid-cols-4">
          {brands.map((brand) => (
            <Link
              key={brand}
              href={`/shop/brands/${brand.toLowerCase().replace(/\s+/g, "-")}`}
              className="group flex items-center justify-center bg-zinc-50 px-4 py-10 transition-colors hover:bg-white"
            >
              <span className="font-display text-2xl font-medium tracking-wide text-zinc-800 transition-colors group-hover:text-black sm:text-3xl">
                {brand}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
