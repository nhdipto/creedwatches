import { announcementMessages } from "@/lib/site";

export function AnnouncementBar() {
  const items = announcementMessages;

  return (
    <div className="relative overflow-hidden bg-black text-white">
      <p className="sr-only">
        {items.join(" • ")}
      </p>
      <div
        aria-hidden
        className="flex w-max animate-marquee items-center whitespace-nowrap py-2"
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {items.map((msg) => (
              <span
                key={`${copy}-${msg}`}
                className="flex items-center text-[11px] font-medium tracking-[0.18em] sm:text-xs"
              >
                <span className="px-6">{msg}</span>
                <span className="text-white/40">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
