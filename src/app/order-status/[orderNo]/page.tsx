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
    title: `Track ${orderNo} | CREED`,
  }));
}

const STEPS: { key: string; label: string }[] = [
  { key: "awaiting_payment", label: "Order placed" },
  { key: "confirmed", label: "Payment confirmed" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];

export default async function OrderStatusDetailPage({
  params,
}: {
  params: Promise<{ orderNo: string }>;
}) {
  const { orderNo } = await params;
  const order = await getOrderByNo(orderNo);
  if (!order) notFound();

  const currentIndex = STEPS.findIndex((s) => s.key === order.status);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/order-status" className="text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-900">
        &larr; Track another order
      </Link>
      <h1 className="mt-4 font-playfair text-3xl uppercase tracking-wide">
        Order {order.orderNo}
      </h1>

      <div className="mt-8 border border-zinc-200 bg-zinc-50 p-6">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-900">
          Status
        </h2>
        <ol className="mt-6 grid grid-cols-2 gap-y-6 sm:grid-cols-4">
          {STEPS.map((step, i) => {
            const done = currentIndex >= i;
            const current = currentIndex === i;
            return (
              <li key={step.key} className="flex flex-col items-start gap-2 sm:items-center sm:text-center">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ${
                    done ? "bg-zinc-900 text-white" : "border border-zinc-300 text-zinc-400"
                  } ${current ? "ring-4 ring-zinc-200" : ""}`}
                >
                  {done ? "✓" : i + 1}
                </span>
                <span className={`text-xs ${done ? "text-zinc-900" : "text-zinc-400"}`}>
                  {step.label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {order.courier && order.trackingNo && (
        <div className="mt-6 border border-zinc-200 p-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-900">
            Courier tracking
          </h2>
          <p className="mt-3 text-sm text-zinc-700">
            Courier: <span className="font-medium text-zinc-900">{order.courier}</span>
          </p>
          <p className="mt-1 text-sm text-zinc-700">
            Tracking number:{" "}
            <span className="font-mono font-medium text-zinc-900">{order.trackingNo}</span>
          </p>
          <p className="mt-3 text-xs text-zinc-500">
            Your parcel is on its way. Delivery takes up to 72 hours across Bangladesh.
          </p>
        </div>
      )}

      <div className="mt-6 border border-zinc-200 p-6">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-900">
          Items
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
        <div className="mt-2 flex justify-between border-t border-zinc-200 pt-3 text-sm">
          <span className="text-zinc-600">Total paid (bKash)</span>
          <span className="font-semibold text-zinc-900">{formatTk(order.total)}</span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="border border-zinc-200 p-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-900">
            Delivery address
          </h2>
          <p className="mt-3 text-sm text-zinc-700">{order.name}</p>
          <p className="mt-1 text-sm text-zinc-700">{order.phone}</p>
          <p className="mt-1 text-sm text-zinc-700">
            {order.address}, {order.city}
          </p>
        </div>
        <div className="border border-zinc-200 p-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-900">
            Payment
          </h2>
          <p className="mt-3 text-sm text-zinc-700">bKash Send Money</p>
          <p className="mt-1 text-sm text-zinc-700">
            TrxID: <span className="font-mono">{order.trxId}</span>
          </p>
          <p className="mt-1 text-xs capitalize text-zinc-500">
            {order.status.replace("_", " ")}
          </p>
        </div>
      </div>
    </div>
  );
}
