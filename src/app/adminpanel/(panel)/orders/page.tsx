import Link from "next/link";
import { listOrders } from "@/lib/db";
import { formatTk } from "@/lib/products";
import { formatDateTime } from "@/lib/admin";

export const dynamic = "force-dynamic";

const STATUS_STYLE: Record<string, string> = {
  awaiting_payment: "bg-amber-100 text-amber-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-700",
};

export default async function AdminOrdersPage() {
  const orders = await listOrders();

  return (
    <div>
      <h1 className="font-playfair text-2xl uppercase tracking-wide">Orders</h1>
      <p className="mt-1 text-sm text-zinc-500">
        {orders.length} orders placed. Open an order to update its status, tracking and invoice.
      </p>

      {orders.length === 0 ? (
        <p className="mt-8 border border-zinc-200 bg-white p-8 text-sm text-zinc-500">
          No orders yet. They will appear here as customers check out.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto border border-zinc-200 bg-white">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-xs uppercase tracking-wide text-zinc-500">
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">TrxID</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Placed</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-zinc-100 last:border-0">
                  <td className="px-4 py-3">
                    <Link
                      href={`/adminpanel/orders/${order.id}`}
                      className="font-mono text-zinc-900 underline-offset-2 hover:underline"
                    >
                      {order.orderNo}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-zinc-900">{order.name}</p>
                    <p className="text-xs text-zinc-400">{order.phone}</p>
                  </td>
                  <td className="px-4 py-3 font-medium text-zinc-900">
                    {formatTk(order.total)}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-500">
                    {order.trxId || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-xs capitalize ${
                        STATUS_STYLE[order.status] ?? "bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      {order.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-zinc-500">{formatDateTime(order.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
