import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderByNo } from "@/lib/db";
import { formatTk } from "@/lib/products";

export const dynamic = "force-dynamic";

export function generateMetadata({
  params,
}: {
  params: Promise<{ orderNo: string }>;
}): Promise<Metadata> {
  return params.then(({ orderNo }) => ({
    title: `Order ${orderNo} | CREED`,
  }));
}

export default async function OrderSuccessPage({
  params,
}: {
  params: Promise<{ orderNo: string }>;
}) {
  const { orderNo } = await params;
  const order = await getOrderByNo(orderNo);
  if (!order) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-8 w-8 text-emerald-700">
          <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
        </svg>
      </div>
      <h1 className="mt-6 font-playfair text-3xl uppercase tracking-wide">
        Order placed
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-zinc-600">
        Thank you, {order.name}. Your order{" "}
        <span className="font-mono font-semibold text-zinc-900">{order.orderNo}</span>{" "}
        has been received. We will confirm your bKash payment and start preparing
        your watches shortly.
      </p>

      <div className="mx-auto mt-10 max-w-xl border border-zinc-200 bg-zinc-50 p-6 text-left">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-900">
          Order Summary
        </h2>
        <ul className="mt-4 divide-y divide-zinc-200">
          {order.items.map((item) => (
            <li key={item.id} className="flex items-center justify-between py-3 text-sm">
              <span className="text-zinc-700">
                {item.title} <span className="text-zinc-400">× {item.quantity}</span>
              </span>
              <span className="font-medium text-zinc-900">
                {formatTk(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-2 space-y-1.5 border-t border-zinc-200 pt-4 text-sm">
          <div className="flex justify-between text-zinc-600">
            <span>Subtotal</span>
            <span className="font-medium text-zinc-900">{formatTk(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-zinc-600">
            <span>Delivery</span>
            <span className="font-medium text-zinc-900">
              {order.deliveryFee === 0 ? "FREE" : formatTk(order.deliveryFee)}
            </span>
          </div>
          <div className="flex justify-between pt-1 text-base font-semibold text-zinc-900">
            <span>Total (bKash)</span>
            <span>{formatTk(order.total)}</span>
          </div>
          <div className="flex justify-between pt-1 text-xs text-zinc-500">
            <span>Payment status</span>
            <span className="capitalize text-amber-600">
              {order.status.replace("_", " ")}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/shop"
          className="bg-zinc-950 px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-zinc-800"
        >
          Continue Shopping
        </Link>
        <Link
          href={`/order-status/${order.orderNo}`}
          className="border border-zinc-300 px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-zinc-900 transition-colors hover:border-zinc-900"
        >
          Track Order
        </Link>
      </div>

      <p className="mt-8 text-xs text-zinc-400">
        Save your order number — you will need it to track your delivery.
      </p>
    </div>
  );
}
