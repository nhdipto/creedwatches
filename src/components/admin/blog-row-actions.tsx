"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function BlogRowActions({ id, published }: { id: number; published: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function remove() {
    if (!window.confirm("Delete this blog post permanently?")) return;
    setBusy(true);
    try {
      await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span
        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
          published ? "bg-emerald-100 text-emerald-800" : "bg-zinc-200 text-zinc-500"
        }`}
      >
        {published ? "Published" : "Draft"}
      </span>
      <button onClick={remove} disabled={busy} className="text-sm text-red-600 hover:underline">
        Delete
      </button>
    </div>
  );
}
