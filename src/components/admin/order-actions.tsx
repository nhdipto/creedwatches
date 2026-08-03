"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUSES = [
  { value: "awaiting_payment", label: "Awaiting payment" },
  { value: "confirmed", label: "Payment confirmed" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export function OrderActions({
  orderId,
  status,
  courier,
  trackingNo,
}: {
  orderId: number;
  status: string;
  courier: string;
  trackingNo: string;
}) {
  const router = useRouter();
  const [statusValue, setStatusValue] = useState(status);
  const [courierValue, setCourierValue] = useState(courier);
  const [trackingValue, setTrackingValue] = useState(trackingNo);
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function updateStatus() {
    setMessage(null);
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: statusValue }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to update status.");
      setMessage("Status updated.");
      router.refresh();
    } catch (err) {
      setMessage((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function updateTracking() {
    setMessage(null);
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/tracking`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courier: courierValue, trackingNo: trackingValue }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save tracking.");
      setMessage("Tracking details saved and order marked as shipped.");
      router.refresh();
    } catch (err) {
      setMessage((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="border border-zinc-200 bg-white p-6">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-900">
          Order status
        </h2>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <select
            value={statusValue}
            onChange={(e) => setStatusValue(e.target.value)}
            className="border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-zinc-900"
          >
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <button
            onClick={updateStatus}
            disabled={busy}
            className="bg-zinc-950 px-5 py-2.5 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-zinc-800 disabled:opacity-60"
          >
            Update
          </button>
        </div>
      </div>

      <div className="border border-zinc-200 bg-white p-6">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-900">
          Shipping tracking
        </h2>
        <p className="mt-2 text-sm text-zinc-500">
          Add courier and tracking number to ship the order. The customer sees this on their
          tracking page.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            value={courierValue}
            onChange={(e) => setCourierValue(e.target.value)}
            placeholder="Courier (e.g. RedX, Pathao, Sundarban)"
            className="border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-zinc-900"
          />
          <input
            value={trackingValue}
            onChange={(e) => setTrackingValue(e.target.value)}
            placeholder="Tracking number"
            className="border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-zinc-900"
          />
        </div>
        <button
          onClick={updateTracking}
          disabled={busy}
          className="mt-4 bg-zinc-950 px-5 py-2.5 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-zinc-800 disabled:opacity-60"
        >
          Save tracking
        </button>
      </div>

      {message && (
        <p className="rounded border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {message}
        </p>
      )}
    </div>
  );
}
