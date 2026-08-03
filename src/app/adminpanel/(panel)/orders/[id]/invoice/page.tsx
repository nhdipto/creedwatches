import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOrder } from "@/lib/db";
import { formatTk } from "@/lib/products";
import { formatDateTime } from "@/lib/admin";
import { PrintButton } from "@/components/admin/print-button";

export const dynamic = "force-dynamic";

export function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  return params.then(async ({ id }) => {
    const order = await getOrder(Number(id));
    return { title: order ? `Invoice ${order.orderNo}` : "Invoice" };
  });
}

const PAYMENT_STATUS: Record<string, string> = {
  awaiting_payment: "Awaiting payment",
  confirmed: "Paid",
  shipped: "Paid",
  delivered: "Paid",
  cancelled: "Cancelled",
};

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrder(Number(id));
  if (!order) notFound();

  return (
    <div className="min-h-screen bg-zinc-200 p-6">
      <div className="mx-auto mb-6 flex max-w-3xl items-center justify-between">
        <PrintButton />
        <p className="text-xs text-zinc-600">
          <a href={`/adminpanel/orders/${order.id}`} className="underline">
            Back to order
          </a>
        </p>
      </div>

      <div className="mx-auto max-w-3xl bg-white p-10 md:p-14" id="invoice">
        <div className="flex items-start justify-between border-b border-zinc-200 pb-8">
          <div>
            <h1 className="font-playfair text-3xl uppercase tracking-wide">CREED</h1>
            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-zinc-400">
              Fine Timepieces &amp; Accessories
            </p>
          </div>
          <div className="text-right text-xs text-zinc-500">
            <p className="font-semibold uppercase tracking-widest text-zinc-900">Invoice</p>
            <p className="mt-2">No. {order.orderNo}</p>
            <p>{formatDateTime(order.createdAt)}</p>
            <p className="mt-2">care@creedwatches.com</p>
            <p>+880 1703-567093</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 py-8 text-sm">
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-400">Billed to</p>
            <p className="mt-2 font-medium text-zinc-900">{order.name}</p>
            <p className="mt-1 text-zinc-600">{order.phone}</p>
            {order.email && <p className="mt-1 text-zinc-600">{order.email}</p>}
            <p className="mt-1 text-zinc-600">
              {order.address}, {order.city}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-zinc-400">Payment</p>
            <p className="mt-2 font-medium text-zinc-900">bKash Send Money</p>
            <p className="mt-1 text-zinc-600">TrxID: {order.trxId}</p>
            <p className="mt-1 text-zinc-600">
              Status:{" "}
              <span className="font-medium text-zinc-900">
                {PAYMENT_STATUS[order.status] ?? order.status}
              </span>
            </p>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-300 text-xs uppercase tracking-widest text-zinc-400">
              <th className="pb-3 text-left">Item</th>
              <th className="pb-3 text-center">Qty</th>
              <th className="pb-3 text-right">Unit price</th>
              <th className="pb-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="border-b border-zinc-100">
                <td className="py-3 text-zinc-900">{item.title}</td>
                <td className="py-3 text-center text-zinc-600">{item.quantity}</td>
                <td className="py-3 text-right text-zinc-600">{formatTk(item.price)}</td>
                <td className="py-3 text-right font-medium text-zinc-900">
                  {formatTk(item.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 ml-auto w-64 space-y-1.5 text-sm">
          <div className="flex justify-between text-zinc-600">
            <span>Subtotal</span>
            <span>{formatTk(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-zinc-600">
            <span>Delivery</span>
            <span>{order.deliveryFee === 0 ? "FREE" : formatTk(order.deliveryFee)}</span>
          </div>
          <div className="flex justify-between border-t border-zinc-200 pt-2 text-base font-semibold text-zinc-900">
            <span>Total</span>
            <span>{formatTk(order.total)}</span>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-200 pt-6 text-xs text-zinc-400">
          <p>
            Thank you for shopping with CREED. Every timepiece is 100% authentic and original
            with full warranty. For support, contact care@creedwatches.com.
          </p>
        </div>
      </div>
    </div>
  );
}
