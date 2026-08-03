"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderStatusPage() {
  const router = useRouter();
  const [orderNo, setOrderNo] = useState("");
  const [error, setError] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = orderNo.trim();
    if (!value) return;
    setError(false);
    router.push(`/order-status/${value}`);
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-20">
      <h1 className="font-playfair text-3xl uppercase tracking-wide">Track your order</h1>
      <p className="mt-3 text-sm text-zinc-500">
        Enter your order number (e.g. CRD-A1B2C3D4) to see its status and delivery
        tracking details.
      </p>
      <form onSubmit={submit} className="mt-8 flex gap-2">
        <input
          value={orderNo}
          onChange={(e) => setOrderNo(e.target.value)}
          placeholder="Order number"
          className="w-full border border-zinc-300 bg-white px-4 py-3 text-sm uppercase text-zinc-900 outline-none transition-colors focus:border-zinc-900 placeholder:normal-case placeholder:text-zinc-400"
        />
        <button
          type="submit"
          className="shrink-0 bg-zinc-950 px-6 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-zinc-800"
        >
          Track
        </button>
      </form>
      {error && (
        <p className="mt-3 text-xs text-red-600">We could not find that order number.</p>
      )}
      <div className="mt-12">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-900">
          How tracking works
        </h2>
        <ol className="mt-4 space-y-4 text-sm text-zinc-600">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-900">
              1
            </span>
            Place your order and pay via bKash Send Money.
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-900">
              2
            </span>
            We confirm payment and hand your parcel to the courier within 24 hours.
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-900">
              3
            </span>
            Receive a tracking number and follow your order here as it ships to your door.
          </li>
        </ol>
      </div>
    </div>
  );
}
