"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function MarketingRowActions({ id, active }: { id: number; active: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function remove() {
    if (!window.confirm("Delete this marketing post?")) return;
    setBusy(true);
    try {
      await fetch(`/api/admin/marketing/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span
        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
          active ? "bg-emerald-100 text-emerald-800" : "bg-zinc-200 text-zinc-500"
        }`}
      >
        {active ? "Live" : "Draft"}
      </span>
      <button onClick={remove} disabled={busy} className="text-sm text-red-600 hover:underline">
        Delete
      </button>
    </div>
  );
}
