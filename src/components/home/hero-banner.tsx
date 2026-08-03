"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRightIcon } from "@/components/icons";

interface Slide {
  image: string;
  eyebrow: string;
  title: string;
  sub: string;
  cta: string;
  href: string;
}

const slides: Slide[] = [
  {
    image: "/images/cover.png",
    eyebrow: "Now open — Dhanmondi Flagship",
    title: "Relocating to a new flagship showroom",
    sub: "A space that celebrates our past and welcomes the future of CREED.",
    cta: "Visit our stores",
    href: "/stores",
  },
  {
    image: "/images/signboard/signboard-1.png",
    eyebrow: "Curated watch brands",
    title: "Heritage names. Modern icons. Independent culture.",
    sub: "From SEVENFRIDAY to Seiko, Tissot to G-Shock — authorized and original.",
    cta: "Shop the collection",
    href: "/shop/all",
  },
  {
    image: "/images/signboard/signboard-2.png",
    eyebrow: "Watch engraving",
    title: "Bespoke watch engraving. In-store. Done in minutes.",
    sub: "Make it yours — personalize a watch with a story that lasts.",
    cta: "Explore engraving",
    href: "/shop/accessories",
  },
];

export function HeroBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  function go(n: number) {
    setIndex((n + slides.length) % slides.length);
  }

  const slide = slides[index];

  return (
    <section
      className="relative h-[70vh] min-h-[480px] w-full overflow-hidden bg-zinc-950 sm:h-[80vh]"
      aria-roledescription="carousel"
      aria-label="Featured announcements"
    >
      {slides.map((s, i) => (
        <div
          key={s.image}
          aria-hidden={i !== index}
          className={
            "absolute inset-0 transition-opacity duration-700 " +
            (i === index ? "opacity-100" : "opacity-0")
          }
        >
          <Image
            src={s.image}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
        </div>
      ))}

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10">
          <div key={slide.title} className="max-w-2xl animate-fade-in text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-200">
              {slide.eyebrow}
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-wide sm:text-6xl">
              {slide.title}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-200 sm:text-base">
              {slide.sub}
            </p>
            <Link
              href={slide.href}
              className="mt-8 inline-flex items-center gap-2 bg-white px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-black transition-colors hover:bg-zinc-200"
            >
              {slide.cta}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-3">
        {slides.map((s, i) => (
          <button
            key={s.image}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={
              "h-1 w-8 transition-colors " +
              (i === index ? "bg-white" : "bg-white/40 hover:bg-white/70")
            }
          />
        ))}
      </div>
    </section>
  );
}
