"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/store";
import { formatTk } from "@/lib/products";
import { ShieldIcon, TruckIcon } from "@/components/icons";

const BKASH_NUMBER = "01703-567093";
const FREE_DELIVERY_THRESHOLD = 15000;
const DELIVERY_FEE = 120;

export default function CheckoutPage() {
  const { cart, clearCart } = useStore();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: "",
    trxId: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const subtotal = useMemo(
    () => cart.reduce((sum, line) => sum + line.price * line.quantity, 0),
    [cart],
  );
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: cart.map((line) => ({ id: line.id, quantity: line.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      clearCart();
      router.push(`/checkout/success/${data.orderNo}`);
    } catch {
      setError("Something went wrong. Please check your connection and retry.");
    } finally {
      setSubmitting(false);
    }
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="font-playfair text-3xl uppercase tracking-wide">Checkout</h1>
        <p className="mt-4 text-sm text-zinc-500">
          Your cart is empty. Add a timepiece before checking out.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block bg-zinc-950 px-10 py-3.5 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-zinc-800"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const inputClass =
    "w-full border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-900 placeholder:text-zinc-400";

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <h1 className="font-playfair text-3xl uppercase tracking-wide">Checkout</h1>
      <p className="mt-2 text-sm text-zinc-500">
        bKash payment only. After you send money, enter your TrxID below to place the order.
      </p>

      <div className="mt-10 grid gap-12 lg:grid-cols-5">
        <form onSubmit={submit} className="space-y-10 lg:col-span-3">
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-900">
              Contact & Delivery
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <input
                required
                value={form.name}
                onChange={(e) => set("name")(e.target.value)}
                placeholder="Full name *"
                className={inputClass}
              />
              <input
                required
                value={form.phone}
                onChange={(e) => set("phone")(e.target.value)}
                placeholder="Phone (e.g. 01700000000) *"
                inputMode="tel"
                className={inputClass}
              />
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email")(e.target.value)}
                placeholder="Email (optional)"
                className={inputClass}
              />
              <input
                required
                value={form.city}
                onChange={(e) => set("city")(e.target.value)}
                placeholder="City / District *"
                className={inputClass}
              />
              <textarea
                required
                value={form.address}
                onChange={(e) => set("address")(e.target.value)}
                placeholder="Full address (house, road, area) *"
                rows={3}
                className={`${inputClass} sm:col-span-2`}
              />
              <textarea
                value={form.notes}
                onChange={(e) => set("notes")(e.target.value)}
                placeholder="Order notes (optional)"
                rows={2}
                className={`${inputClass} sm:col-span-2`}
              />
            </div>
          </section>

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-900">
              bKash Payment
            </h2>
            <div className="mt-4 rounded border border-emerald-200 bg-emerald-50 p-5 text-sm leading-relaxed text-zinc-700">
              <p className="font-semibold text-zinc-900">
                1. Send Money from your bKash account
              </p>
              <p className="mt-1">
                Personal Number:{" "}
                <span className="font-mono font-semibold text-zinc-900">{BKASH_NUMBER}</span>
              </p>
              <p className="mt-1">
                Amount: <span className="font-semibold text-zinc-900">{formatTk(total)}</span>
              </p>
              <p className="mt-2 text-xs text-zinc-500">
                This is the total including delivery. No bKash fee is charged to you.
              </p>
              <p className="mt-4 font-semibold text-zinc-900">
                2. Enter your TrxID below
              </p>
              <input
                required
                value={form.trxId}
                onChange={(e) => set("trxId")(e.target.value)}
                placeholder="bKash TrxID (e.g. 9HJ2K4L5M6) *"
                className="mt-2 w-full border border-emerald-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-900 placeholder:text-zinc-400"
              />
            </div>
          </section>

          {error && (
            <p className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-zinc-950 py-4 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Placing order..." : "Place Order — Pay by bKash"}
          </button>
        </form>

        <aside className="lg:col-span-2">
          <div className="sticky top-24 border border-zinc-200 bg-zinc-50 p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-900">
              Order Summary
            </h2>
            <ul className="mt-4 divide-y divide-zinc-200">
              {cart.map((line) => (
                <li key={line.id} className="flex gap-4 py-4">
                  {line.image && (
                    <Image
                      src={line.image}
                      alt={line.title}
                      width={64}
                      height={64}
                      className="h-16 w-16 shrink-0 border border-zinc-200 bg-white object-cover"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-zinc-900">{line.title}</p>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      Qty {line.quantity} × {formatTk(line.price)}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-zinc-900">
                    {formatTk(line.price * line.quantity)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-2 space-y-1.5 border-t border-zinc-200 pt-4 text-sm">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span>
                <span className="font-medium text-zinc-900">{formatTk(subtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Delivery</span>
                <span className="font-medium text-zinc-900">
                  {deliveryFee === 0 ? "FREE" : formatTk(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between pt-2 text-base font-semibold text-zinc-900">
                <span>Total</span>
                <span>{formatTk(total)}</span>
              </div>
            </div>
            {deliveryFee > 0 && (
              <p className="mt-3 text-xs text-zinc-500">
                Free delivery on orders over {formatTk(FREE_DELIVERY_THRESHOLD)}.
              </p>
            )}
            <div className="mt-6 flex items-center gap-2 border-t border-zinc-200 pt-4 text-xs text-zinc-500">
              <ShieldIcon className="h-4 w-4" />
              <span>Authentic & original watches, guaranteed.</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
              <TruckIcon className="h-4 w-4" />
              <span>Delivered across all 64 districts in 72 hours.</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
