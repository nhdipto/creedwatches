"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/store";
import { ArrowRightIcon, CloseIcon, SearchIcon } from "@/components/icons";

const popularSearches = [
  "G-SHOCK",
  "Tissot PRX",
  "Seiko",
  "Automatic",
  "Casio Edifice",
  "Couple Watch",
];

export function SearchOverlay() {
  const { searchOpen, closeSearch } = useStore();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [searchOpen]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    closeSearch();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  if (!searchOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      className="fixed inset-0 z-[60] flex flex-col bg-white animate-fade-in"
    >
      <div className="flex items-center gap-3 border-b border-zinc-200 px-5 py-4">
        <SearchIcon className="h-5 w-5 text-zinc-500" />
        <form onSubmit={submit} className="flex-1">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            placeholder="Search watches, brands, collections…"
            className="w-full bg-transparent text-lg outline-none placeholder:text-zinc-400"
          />
        </form>
        <button
          onClick={closeSearch}
          aria-label="Close search"
          className="p-1 text-zinc-600 hover:text-zinc-900"
        >
          <CloseIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="mx-auto w-full max-w-2xl flex-1 px-5 py-8">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
          Popular Searches
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {popularSearches.map((term) => (
            <li key={term}>
              <button
                onClick={() => {
                  closeSearch();
                  router.push(`/search?q=${encodeURIComponent(term)}`);
                }}
                className="border border-zinc-300 px-4 py-2 text-sm transition-colors hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
              >
                {term}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => closeSearch()}
          className="mt-10 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-zinc-700 hover:text-zinc-950"
        >
          Browse All Watches <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
