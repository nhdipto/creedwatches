"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/store";
import { formatTk, productHref, type Product } from "@/lib/products";
import { BagIcon } from "@/components/icons";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, openCart } = useStore();

  function handleAdd() {
    addToCart({
      id: product.id,
      title: product.name,
      price: product.price,
      compareAt: product.compareAt,
      image: product.image,
      quantity: 1,
    });
    openCart();
  }

  const hasCompare = Boolean(product.compareAt);
  const badge = product.badge
    ? product.badge
    : hasCompare
      ? "SALE"
      : null;

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
        <Link href={productHref(product)} aria-label={product.name}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {badge && (
          <span className="absolute left-3 top-3 bg-black px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
            {badge}
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-white/95 p-3 transition-transform duration-300 group-hover:translate-y-0">
          <button
            onClick={handleAdd}
            className="flex w-full items-center justify-center gap-2 bg-black py-2.5 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-zinc-800"
          >
            <BagIcon className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>

      <div className="pt-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
          {product.brand}
        </p>
        <Link
          href={productHref(product)}
          className="mt-1 block text-sm leading-snug text-zinc-800 hover:text-black"
        >
          {product.name}
        </Link>
        <p className="mt-2 flex items-baseline gap-2">
          <span className="text-sm font-semibold text-black">
            Tk {formatTk(product.price)}
          </span>
          {hasCompare && (
            <span className="text-xs text-zinc-400 line-through">
              Tk {formatTk(product.compareAt!)}
            </span>
          )}
        </p>
      </div>
    </article>
  );
}
