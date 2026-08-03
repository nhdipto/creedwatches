"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/components/icons";

export function SearchBox({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form
      onSubmit={submit}
      className="flex items-center gap-3 border-b-2 border-zinc-900 pb-2"
    >
      <SearchIcon className="h-5 w-5 text-zinc-500" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="search"
        placeholder="Try &ldquo;Seiko&rdquo;, &ldquo;automatic&rdquo;, &ldquo;PRX&rdquo;…"
        className="w-full bg-transparent py-1 text-base outline-none placeholder:text-zinc-400"
      />
      <button
        type="submit"
        className="bg-black px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-zinc-800"
      >
        Search
      </button>
    </form>
  );
}
