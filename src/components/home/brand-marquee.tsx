const marqueeText =
  "CURATED WATCH BRANDS • GLOBAL NAMES • INDEPENDENT WATCH CULTURE";

export function BrandMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-zinc-200 bg-white py-5">
      <p className="sr-only">{marqueeText}</p>
      <div
        aria-hidden
        className="flex w-max animate-marquee items-center whitespace-nowrap"
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {[0, 1].map((rep) => (
              <span
                key={rep}
                className="flex items-center text-sm font-medium tracking-[0.3em] text-black sm:text-base"
              >
                <span className="px-6">{marqueeText}</span>
                <span className="text-zinc-300">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
