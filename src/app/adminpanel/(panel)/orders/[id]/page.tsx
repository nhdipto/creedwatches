import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrder } from "@/lib/db";
import { formatTk } from "@/lib/products";
import { formatDateTime } from "@/lib/admin";
import { OrderActions } from "@/components/admin/order-actions";

export const dynamic = "force-dynamic";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrder(Number(id));
  if (!order) notFound();

  return (
    <div>
      <Link
        href="/adminpanel/orders"
        className="text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-900"
      >
        &larr; Back to orders
      </Link>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair text-2xl uppercase tracking-wide">
            Order <span className="font-mono">{order.orderNo}</span>
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Placed {formatDateTime(order.createdAt)}
          </p>
        </div>
        <Link
          href={`/adminpanel/orders/${order.id}/invoice`}
          target="_blank"
          className="border border-zinc-300 bg-white px-6 py-3 text-sm font-medium uppercase tracking-widest text-zinc-900 transition-colors hover:border-zinc-900"
        >
          View invoice
        </Link>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="border border-zinc-200 bg-white p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-900">
              Items
            </h2>
            <ul className="mt-4 divide-y divide-zinc-100">
              {order.items.map((item) => (
                <li key={item.id} className="flex items-center justify-between py-3 text-sm">
                  <span className="text-zinc-700">
                    {item.title}{" "}
                    <span className="text-zinc-400">× {item.quantity}</span>
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
                <span>{formatTk(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Delivery</span>
                <span>{order.deliveryFee === 0 ? "FREE" : formatTk(order.deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-zinc-900">
                <span>Total</span>
                <span>{formatTk(order.total)}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="border border-zinc-200 bg-white p-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-900">
                Delivery address
              </h2>
              <p className="mt-3 text-sm font-medium text-zinc-900">{order.name}</p>
              <p className="mt-1 text-sm text-zinc-600">{order.phone}</p>
              {order.email && <p className="mt-1 text-sm text-zinc-600">{order.email}</p>}
              <p className="mt-2 text-sm text-zinc-600">
                {order.address}, {order.city}
              </p>
              {order.notes && <p className="mt-2 text-xs text-zinc-400">Notes: {order.notes}</p>}
            </div>
            <div className="border border-zinc-200 bg-white p-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-900">
                Payment (bKash)
              </h2>
              <p className="mt-3 text-sm text-zinc-600">Send Money</p>
              <p className="mt-1 text-sm text-zinc-600">
                TrxID: <span className="font-mono font-medium text-zinc-900">{order.trxId}</span>
              </p>
              <p className="mt-3 text-xs text-zinc-500">
                Verify the TrxID against your bKash history before confirming payment.
              </p>
            </div>
          </div>
        </div>

        <div>
          <OrderActions
            orderId={order.id}
            status={order.status}
            courier={order.courier}
            trackingNo={order.trackingNo}
          />
          <div className="mt-6 border border-zinc-200 bg-white p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-900">
              Links
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href={`/order-status/${order.orderNo}`}
                  target="_blank"
                  className="text-zinc-600 underline-offset-2 hover:underline"
                >
                  Customer tracking page →
                </a>
              </li>
              <li>
                <a
                  href={`/adminpanel/orders/${order.id}/invoice`}
                  target="_blank"
                  className="text-zinc-600 underline-offset-2 hover:underline"
                >
                  Printable invoice →
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
