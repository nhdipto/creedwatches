import Link from "next/link";
import type { NavItem } from "@/lib/site";

export function MegaMenuPanel({ item }: { item: NavItem }) {
  if (!item.megaMenu) return null;
  const { columns, brands } = item.megaMenu;

  return (
    <div className="absolute left-1/2 top-full hidden w-screen max-w-5xl -translate-x-1/2 border border-zinc-200 bg-white pt-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] group-hover:block">
      <div className="grid grid-cols-[1fr_1fr_1fr_1.4fr] gap-8 px-10 py-6">
        {columns.map((col) => (
          <div key={col.title}>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400">
              {col.title}
            </p>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-700 transition-colors hover:text-zinc-950 hover:underline underline-offset-4"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400">
            Brands
          </p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
            {brands.map((brand) => (
              <li key={brand}>
                <Link
                  href={`/shop/brands/${brand.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm text-zinc-700 transition-colors hover:text-zinc-950 hover:underline underline-offset-4"
                >
                  {brand}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50 px-10 py-3">
        <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
          Curated brands • Global names • Independent watch culture
        </p>
        <Link
          href="/shop/all"
          className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-950 hover:text-zinc-600"
        >
          View all watches
          <ChevronRightMini />
        </Link>
      </div>
    </div>
  );
}

function ChevronRightMini() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}
