"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { ChevronDownIcon, CloseIcon } from "@/components/icons";
import {
  priceRanges,
  uniqueBrands,
  uniqueOptions,
  type Product,
} from "@/lib/products";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
  { value: "name", label: "Name A–Z" },
] as const;

type SortKey = (typeof SORT_OPTIONS)[number]["value"];

const PAGE_SIZE = 8;

interface FilterGroupProps {
  title: string;
  count: number;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function FilterGroup({ title, count, open, onToggle, children }: FilterGroupProps) {
  return (
    <div className="border-b border-zinc-200 py-4">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 text-left"
        aria-expanded={open}
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-900">
          {title} <span className="ml-1 text-zinc-400">({count})</span>
        </span>
        <ChevronDownIcon
          className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="mt-4 space-y-2.5">{children}</div>}
    </div>
  );
}

interface OptionRowProps {
  label: string;
  count: number;
  checked: boolean;
  onToggle: () => void;
}

function OptionRow({ label, count, checked, onToggle }: OptionRowProps) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 text-sm text-zinc-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-none border border-zinc-400 bg-white transition-colors checked:border-black checked:bg-black focus:outline-none"
      />
      <span className="flex-1 transition-colors group-hover:text-black">
        {label}
      </span>
      <span className="text-xs text-zinc-400">{count}</span>
    </label>
  );
}

export function CollectionBrowser({
  products,
  title,
  description,
}: {
  products: Product[];
  title: string;
  description: string;
}) {
  const [open, setOpen] = useState<Record<string, boolean>>({
    brands: true,
    gender: true,
    price: true,
    strap: true,
    dial: true,
  });
  const [brands, setBrands] = useState<string[]>([]);
  const [genders, setGenders] = useState<string[]>([]);
  const [ranges, setRanges] = useState<string[]>([]);
  const [straps, setStraps] = useState<string[]>([]);
  const [dials, setDials] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("featured");
  const [page, setPage] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);

  const brandOptions = useMemo(() => uniqueBrands(products), [products]);
  const genderOptions = useMemo(() => uniqueOptions(products, "gender"), [products]);
  const strapOptions = useMemo(() => uniqueOptions(products, "strap"), [products]);
  const dialOptions = useMemo(() => uniqueOptions(products, "dial"), [products]);

  const countInRange = (range: (typeof priceRanges)[number]) =>
    products.filter((p) => p.price >= range.min && p.price < range.max).length;

  const toggle = (
    list: string[],
    setter: (v: string[]) => void,
    value: string,
  ) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
    setPage(1);
  };

  const activeFilterCount =
    brands.length + genders.length + ranges.length + straps.length + dials.length;

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (brands.length && !brands.includes(p.brand)) return false;
      if (genders.length && !genders.includes(p.gender)) return false;
      if (straps.length && !straps.includes(p.strap)) return false;
      if (dials.length && !dials.includes(p.dial)) return false;
      if (ranges.length) {
        const hit = ranges.some((label) => {
          const range = priceRanges.find((r) => r.label === label);
          if (!range) return false;
          return p.price >= range.min && p.price < range.max;
        });
        if (!hit) return false;
      }
      return true;
    });
  }, [products, brands, genders, ranges, straps, dials]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    switch (sort) {
      case "price-asc":
        return copy.sort((a, b) => a.price - b.price);
      case "price-desc":
        return copy.sort((a, b) => b.price - a.price);
      case "newest":
        return copy.sort((a, b) => b.dateAdded - a.dateAdded);
      case "name":
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return copy;
    }
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function clearFilters() {
    setBrands([]);
    setGenders([]);
    setRanges([]);
    setStraps([]);
    setDials([]);
    setPage(1);
  }

  const filterSidebar = (
    <aside className="space-y-1">
      <div className="flex items-center justify-between pb-1">
        <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-900">
          Filters
        </h2>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-widest text-zinc-500 transition-colors hover:text-black"
          >
            <CloseIcon className="h-3 w-3" />
            Clear ({activeFilterCount})
          </button>
        )}
      </div>

      <FilterGroup
        title="Brand"
        count={brandOptions.length}
        open={open.brands}
        onToggle={() => setOpen((o) => ({ ...o, brands: !o.brands }))}
      >
        {brandOptions.map((brand) => (
          <OptionRow
            key={brand}
            label={brand}
            count={products.filter((p) => p.brand === brand).length}
            checked={brands.includes(brand)}
            onToggle={() => toggle(brands, setBrands, brand)}
          />
        ))}
      </FilterGroup>

      <FilterGroup
        title="Gender"
        count={genderOptions.length}
        open={open.gender}
        onToggle={() => setOpen((o) => ({ ...o, gender: !o.gender }))}
      >
        {genderOptions.map((gender) => (
          <OptionRow
            key={gender}
            label={gender}
            count={products.filter((p) => p.gender === gender).length}
            checked={genders.includes(gender)}
            onToggle={() => toggle(genders, setGenders, gender)}
          />
        ))}
      </FilterGroup>

      <FilterGroup
        title="Price Range"
        count={priceRanges.length}
        open={open.price}
        onToggle={() => setOpen((o) => ({ ...o, price: !o.price }))}
      >
        {priceRanges.map((range) => (
          <OptionRow
            key={range.label}
            label={range.label}
            count={countInRange(range)}
            checked={ranges.includes(range.label)}
            onToggle={() => toggle(ranges, setRanges, range.label)}
          />
        ))}
      </FilterGroup>

      <FilterGroup
        title="Strap Material"
        count={strapOptions.length}
        open={open.strap}
        onToggle={() => setOpen((o) => ({ ...o, strap: !o.strap }))}
      >
        {strapOptions.map((strap) => (
          <OptionRow
            key={strap}
            label={strap}
            count={products.filter((p) => p.strap === strap).length}
            checked={straps.includes(strap)}
            onToggle={() => toggle(straps, setStraps, strap)}
          />
        ))}
      </FilterGroup>

      <FilterGroup
        title="Dial Colour"
        count={dialOptions.length}
        open={open.dial}
        onToggle={() => setOpen((o) => ({ ...o, dial: !o.dial }))}
      >
        {dialOptions.map((dial) => (
          <OptionRow
            key={dial}
            label={dial}
            count={products.filter((p) => p.dial === dial).length}
            checked={dials.includes(dial)}
            onToggle={() => toggle(dials, setDials, dial)}
          />
        ))}
      </FilterGroup>
    </aside>
  );

  const pageNumbers: (number | "…")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
      pageNumbers.push(i);
    } else if (pageNumbers[pageNumbers.length - 1] !== "…") {
      pageNumbers.push("…");
    }
  }

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-10 sm:px-6 lg:px-10">
      {/* Banner */}
      <div className="bg-black px-6 py-12 text-center sm:px-10 lg:py-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500">
          CREED WATCHES
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-wide text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
          {description}
        </p>
      </div>

      <div className="mt-8 lg:grid lg:grid-cols-[260px_1fr] lg:items-start lg:gap-10">
        {/* Mobile filter toggle */}
        <div className="mb-4 lg:hidden">
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex w-full items-center justify-between border border-zinc-900 px-4 py-3 text-xs font-semibold uppercase tracking-widest"
          >
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            <ChevronDownIcon
              className={`h-4 w-4 transition-transform ${mobileOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        <div className={`${mobileOpen ? "block" : "hidden"} mb-8 lg:sticky lg:top-24 lg:block`}>
          {filterSidebar}
        </div>

        {/* Main content */}
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-zinc-500">
              <span className="font-semibold text-black">{sorted.length}</span>{" "}
              {sorted.length === 1 ? "item" : "items"}
              {activeFilterCount > 0 && " — filtered"}
            </p>
            <label className="flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-zinc-500">
              Sort by
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value as SortKey);
                  setPage(1);
                }}
                className="border border-zinc-300 bg-white px-3 py-2 text-xs font-medium uppercase tracking-widest text-zinc-900 outline-none transition-colors focus:border-black"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {paged.length === 0 ? (
            <div className="flex flex-col items-center justify-center border border-zinc-200 px-6 py-20 text-center">
              <p className="font-display text-xl text-zinc-900">
                No watches match those filters
              </p>
              <p className="mt-2 max-w-sm text-sm text-zinc-500">
                Try removing a filter or two — the perfect piece is probably hiding just
                behind one.
              </p>
              <button
                onClick={clearFilters}
                className="mt-6 border border-zinc-900 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors hover:bg-zinc-900 hover:text-white"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
              {paged.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav
              aria-label="Pagination"
              className="mt-12 flex items-center justify-center gap-2"
            >
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="border border-zinc-300 px-3.5 py-2 text-xs font-semibold uppercase tracking-widest transition-colors hover:border-zinc-900 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Prev
              </button>
              {pageNumbers.map((n, i) =>
                n === "…" ? (
                  <span key={`ellipsis-${i}`} className="px-2 text-sm text-zinc-400">
                    …
                  </span>
                ) : (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    aria-current={n === currentPage ? "page" : undefined}
                    className={`h-10 w-10 border text-sm font-medium transition-colors ${
                      n === currentPage
                        ? "border-black bg-black text-white"
                        : "border-zinc-300 text-zinc-700 hover:border-zinc-900"
                    }`}
                  >
                    {n}
                  </button>
                ),
              )}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="border border-zinc-300 px-3.5 py-2 text-xs font-semibold uppercase tracking-widest transition-colors hover:border-zinc-900 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
