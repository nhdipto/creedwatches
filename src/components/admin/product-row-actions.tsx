"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ProductRowActions({
  id,
  stock,
  active,
}: {
  id: string;
  stock: number;
  active: boolean;
}) {
  const router = useRouter();
  const [stockValue, setStockValue] = useState(String(stock));
  const [busy, setBusy] = useState(false);

  async function update(payload: { stock?: number; active?: boolean }) {
    setBusy(true);
    try {
      await fetch(`/api/admin/products/${id}/stock`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!window.confirm("Delete this product permanently?")) return;
    setBusy(true);
    try {
      await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        min="0"
        value={stockValue}
        onChange={(e) => setStockValue(e.target.value)}
        onBlur={() => {
          if (Number(stockValue) !== stock) update({ stock: Number(stockValue) });
        }}
        className="w-16 border border-zinc-300 px-2 py-1.5 text-sm outline-none focus:border-zinc-900"
      />
      <button
        onClick={() => update({ active: !active })}
        disabled={busy}
        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
          active ? "bg-emerald-100 text-emerald-800" : "bg-zinc-200 text-zinc-500"
        }`}
      >
        {active ? "Live" : "Hidden"}
      </button>
      <button onClick={remove} disabled={busy} className="text-sm text-red-600 hover:underline">
        Delete
      </button>
    </div>
  );
}
