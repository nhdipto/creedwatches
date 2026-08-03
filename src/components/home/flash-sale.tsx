"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { ArrowRightIcon } from "@/components/icons";
import type { Product } from "@/lib/products";

const SALE_END = Date.now() + (3 * 24 * 3600 + 8 * 3600 + 25 * 60) * 1000;

function diffParts() {
  const diff = Math.max(0, SALE_END - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    d: Math.floor(totalSeconds / 86400),
    h: Math.floor((totalSeconds % 86400) / 3600),
    m: Math.floor((totalSeconds % 3600) / 60),
    s: totalSeconds % 60,
  };
}

const pad = (n: number) => n.toString().padStart(2, "0");

export function FlashSale({ items }: { items: Product[] }) {
  const [time, setTime] = useState(diffParts);

  useEffect(() => {
    const t = setInterval(() => setTime(diffParts()), 1000);
    return () => clearInterval(t);
  }, []);

  const cells = [
    { label: "Days", value: time.d },
    { label: "Hours", value: time.h },
    { label: "Mins", value: time.m },
    { label: "Secs", value: time.s },
  ];

  return (
    <section className="bg-black py-16 lg:py-20">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-8 text-white md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-400">
              Limited time only
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-wide sm:text-4xl">
              Explore Deals!
            </h2>
            <p className="mt-3 max-w-md text-sm text-zinc-400">
              Flash pricing on select timepieces. When the clock hits zero, the
              offers are gone.
            </p>
          </div>

          <div className="flex gap-3">
            {cells.map((cell) => (
              <div
                key={cell.label}
                className="flex w-16 flex-col items-center border border-white/20 px-2 py-3 sm:w-20"
              >
                <span className="font-display text-3xl font-semibold tabular-nums">
                  {pad(cell.value)}
                </span>
                <span className="mt-1 text-[10px] uppercase tracking-widest text-zinc-400">
                  {cell.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {items.map((product) => (
            <div key={product.id} className="bg-white p-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/shop/limited-edition"
            className="inline-flex items-center gap-2 border border-white px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
          >
            Shop all deals
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
