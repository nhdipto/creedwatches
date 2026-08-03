import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

interface Collection {
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  image: string;
  flip?: boolean;
}

const collections: Collection[] = [
  {
    eyebrow: "Curated for enthusiasts",
    title: "The Watch Edit.",
    text: "A hand-picked selection from heritage names to independent microbrands — the pieces we'd wear ourselves.",
    cta: "Explore now",
    href: "/shop/the-watch-edit",
    image: "/images/products/product-10.jpg",
  },
  {
    eyebrow: "Switzerland since 1832",
    title: "The Spirit of Longines.",
    text: "Precision, elegance and heritage. Discover automatic legends from the brand that defined Swiss watchmaking.",
    cta: "Shop Longines",
    href: "/shop/brands/longines",
    image: "/images/products/product-06.jpg",
    flip: true,
  },
  {
    eyebrow: "Worn together",
    title: "Couple Watches.",
    text: "Moments, moods and watches that stay with you. Find the perfect pair to share.",
    cta: "Shop couple watches",
    href: "/shop/couple-watches",
    image: "/images/products/product-12.jpg",
  },
];

export function FeaturedCollections() {
  return (
    <section className="mx-auto max-w-screen-2xl px-4 pb-16 sm:px-6 lg:px-10 lg:pb-20">
      <div className="space-y-14 lg:space-y-20">
        {collections.map((c) => (
          <div
            key={c.title}
            className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
          >
            <Link
              href={c.href}
              className={
                "relative block aspect-[4/3] overflow-hidden bg-zinc-100 lg:aspect-[16/10] " +
                (c.flip ? "lg:order-2" : "")
              }
            >
              <Image
                src={c.image}
                alt={c.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10" />
            </Link>

            <div className={c.flip ? "lg:order-1" : ""}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-400">
                {c.eyebrow}
              </p>
              <h3 className="mt-3 font-display text-3xl font-semibold tracking-wide text-black sm:text-4xl">
                {c.title}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-600">
                {c.text}
              </p>
              <Link
                href={c.href}
                className="group mt-6 inline-flex items-center gap-2 border-b border-black pb-1 text-xs font-semibold uppercase tracking-widest text-black transition-colors hover:border-zinc-400 hover:text-zinc-500"
              >
                {c.cta}
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
