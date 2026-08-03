"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/store";
import { formatTk, type Product } from "@/lib/products";
import {
  BagIcon,
  BadgeIcon,
  ChevronDownIcon,
  MinusIcon,
  PlusIcon,
  StarIcon,
  TruckIcon,
  ShieldIcon,
} from "@/components/icons";

function Stars({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className={`h-4 w-4 ${i < filled ? "text-black" : "text-zinc-200"}`}
        />
      ))}
    </span>
  );
}

const SPEC_ROWS: (keyof Product)[] = [
  "brand",
  "sku",
  "gender",
  "movement",
  "caseSize",
  "waterResistance",
  "strap",
  "dial",
];

function specLabel(key: keyof Product): string {
  switch (key) {
    case "brand":
      return "Brand";
    case "sku":
      return "Reference / SKU";
    case "gender":
      return "Gender";
    case "movement":
      return "Movement";
    case "caseSize":
      return "Case Size";
    case "waterResistance":
      return "Water Resistance";
    case "strap":
      return "Strap Material";
    case "dial":
      return "Dial Colour";
    default:
      return key;
  }
}

interface TabProps {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function Accordion({ title, open, onToggle, children }: TabProps) {
  return (
    <div className="border-b border-zinc-200">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 py-5 text-left"
      >
        <span className="font-display text-lg font-semibold tracking-wide text-zinc-900">
          {title}
        </span>
        <ChevronDownIcon
          className={`h-5 w-5 text-zinc-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="pb-6 text-sm leading-relaxed text-zinc-600">{children}</div>}
    </div>
  );
}

export function ProductDetail({
  product,
  gallery,
}: {
  product: Product;
  gallery: string[];
}) {
  const { addToCart, openCart } = useStore();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<string>("description");

  const hasCompare = Boolean(product.compareAt);
  const discount = hasCompare
    ? Math.round(((product.compareAt! - product.price) / product.compareAt!) * 100)
    : 0;

  function add(openAfter: boolean) {
    addToCart({
      id: product.id,
      title: product.name,
      price: product.price,
      compareAt: product.compareAt,
      image: product.image,
      quantity,
    });
    if (openAfter) openCart();
  }

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <nav className="mb-8 text-xs uppercase tracking-widest text-zinc-400">
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/shop/brands/${product.brandSlug}`} className="hover:text-black">
          {product.brand}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-700">{product.name}</span>
      </nav>

      <div className="lg:grid lg:grid-cols-2 lg:gap-12">
        {/* Gallery */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative aspect-square overflow-hidden bg-zinc-100">
            <Image
              key={activeImage}
              src={gallery[activeImage]}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            {product.badge && (
              <span className="absolute left-4 top-4 bg-black px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white">
                {product.badge}
              </span>
            )}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {gallery.map((src, i) => (
              <button
                key={src}
                onClick={() => setActiveImage(i)}
                className={`relative aspect-square overflow-hidden bg-zinc-100 transition-all ${
                  i === activeImage
                    ? "ring-2 ring-black ring-offset-2"
                    : "opacity-70 hover:opacity-100"
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="mt-10 lg:mt-0">
          <Link
            href={`/shop/brands/${product.brandSlug}`}
            className="text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-400 transition-colors hover:text-black"
          >
            {product.brand}
          </Link>
          <h1 className="mt-2 font-display text-2xl font-semibold leading-tight tracking-wide text-black sm:text-3xl">
            {product.name}
          </h1>
          <p className="mt-2 text-xs uppercase tracking-widest text-zinc-400">
            SKU: {product.sku}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Stars rating={product.rating} />
            <span className="text-sm font-medium text-zinc-900">{product.rating}</span>
            <a href="#reviews" className="text-sm text-zinc-500 underline-offset-4 hover:underline">
              {product.reviews} reviews
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="font-display text-3xl font-semibold text-black">
              {formatTk(product.price)}
            </span>
            {hasCompare && (
              <>
                <span className="text-lg text-zinc-400 line-through">
                  {formatTk(product.compareAt!)}
                </span>
                <span className="bg-black px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                  Save {discount}%
                </span>
              </>
            )}
          </div>

          <p className="mt-6 border-l-2 border-black pl-4 text-sm leading-relaxed text-zinc-600">
            {product.description}
          </p>

          {/* Quantity + Add to cart */}
          <div className="mt-8 flex flex-wrap items-stretch gap-3">
            <div className="flex items-center border border-zinc-300">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-full items-center px-3 text-zinc-600 transition-colors hover:text-black"
                aria-label="Decrease quantity"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <span className="w-12 text-center text-sm font-medium" aria-live="polite">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                className="flex h-full items-center px-3 text-zinc-600 transition-colors hover:text-black"
                aria-label="Increase quantity"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={() => add(true)}
              className="flex flex-1 items-center justify-center gap-2 bg-black px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-zinc-800"
            >
              <BagIcon className="h-4 w-4" />
              Add to Cart
            </button>
          </div>

          <button
            onClick={() => add(true)}
            className="mt-3 w-full border border-zinc-900 bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white"
          >
            Buy it Now
          </button>

          {/* Pickup */}
          <div className="mt-6 flex items-start gap-3 border border-zinc-200 bg-zinc-50 p-4">
            <BadgeIcon className="mt-0.5 h-5 w-5 shrink-0 text-black" />
            <div>
              <p className="text-sm font-semibold text-zinc-900">
                Pickup available at CREED — STORE 1, DHANMONDI
              </p>
              <p className="mt-0.5 text-sm text-zinc-500">
                Usually ready in 1 hour. Check the store before you head out.
              </p>
            </div>
          </div>

          {/* Trust row */}
          <div className="mt-6 grid grid-cols-3 gap-px bg-zinc-200 text-center">
            <div className="bg-white px-2 py-4">
              <BadgeIcon className="mx-auto h-5 w-5 text-black" />
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-700">
                Authentic &amp; Original
              </p>
            </div>
            <div className="bg-white px-2 py-4">
              <TruckIcon className="mx-auto h-5 w-5 text-black" />
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-700">
                Nationwide Delivery
              </p>
            </div>
            <div className="bg-white px-2 py-4">
              <ShieldIcon className="mx-auto h-5 w-5 text-black" />
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-700">
                bKash &amp; Nagad
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Accordions + trust */}
      <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_340px]">
        <div id="reviews" className="border-t border-zinc-200">
          <Accordion
            title="Product Description"
            open={tab === "description"}
            onToggle={() => setTab(tab === "description" ? "" : "description")}
          >
            <p>{product.description}</p>
            <p className="mt-4">
              Every piece at CREED is sourced directly from the brand or its authorised
              distributor — never grey-market. Each watch is inspected, photographed and
              hand-packed before it ships, so what arrives matches exactly what you see
              on screen.
            </p>
            <p className="mt-4">
              Need it sized, engraved or gift-wrapped? Every CREED store offers these
              services free of charge at the time of purchase.
            </p>
          </Accordion>

          <Accordion
            title="Specifications"
            open={tab === "specifications"}
            onToggle={() => setTab(tab === "specifications" ? "" : "specifications")}
          >
            <dl className="divide-y divide-zinc-100">
              {SPEC_ROWS.map((key) => (
                <div key={key} className="flex items-center justify-between py-2.5">
                  <dt className="text-zinc-500">{specLabel(key)}</dt>
                  <dd className="font-medium text-zinc-900">
                    {product[key] as string}
                  </dd>
                </div>
              ))}
            </dl>
          </Accordion>

          <Accordion
            title="Warranty Information"
            open={tab === "warranty"}
            onToggle={() => setTab(tab === "warranty" ? "" : "warranty")}
          >
            <p>
              Your watch is covered by the manufacturer&apos;s official international
              warranty from the day of purchase — details are in the box along with your
              CREED warranty card.
            </p>
            <p className="mt-4">
              CREED adds a complimentary 12-month store warranty covering any
              manufacturing defect. Automatic and solar models also include one free
              inspection within the first year. Register your serial number by emailing{" "}
              <a href="mailto:care@creedwatches.com" className="text-black underline underline-offset-2">
                care@creedwatches.com
              </a>{" "}
              within 30 days.
            </p>
          </Accordion>
        </div>

        <aside className="h-fit border border-zinc-200 p-6 lg:sticky lg:top-24">
          <h3 className="font-display text-xl font-semibold text-black">
            The CREED Guarantee
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-zinc-600">
            <li className="flex gap-3">
              <BadgeIcon className="mt-0.5 h-4 w-4 shrink-0" />
              100% genuine watches, guaranteed or full refund
            </li>
            <li className="flex gap-3">
              <TruckIcon className="mt-0.5 h-4 w-4 shrink-0" />
              Delivery to all 64 districts within 72 hours
            </li>
            <li className="flex gap-3">
              <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0" />
              Pay with bKash, Nagad or bank transfer
            </li>
            <li className="flex gap-3">
              <BadgeIcon className="mt-0.5 h-4 w-4 shrink-0" />
              7-day exchange on unworn watches
            </li>
          </ul>
          <Link
            href="/contact"
            className="mt-6 block border border-zinc-900 px-5 py-3 text-center text-xs font-semibold uppercase tracking-widest transition-colors hover:bg-zinc-900 hover:text-white"
          >
            Ask a question
          </Link>
        </aside>
      </div>
    </div>
  );
}
