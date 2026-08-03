import Link from "next/link";
import { adminListProducts, listMarketingPosts, listOrders } from "@/lib/db";
import { formatTk } from "@/lib/products";
import { formatDateTime } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const orders = await listOrders();
  const products = await adminListProducts();

  const revenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);
  const pending = orders.filter(
    (o) => o.status === "awaiting_payment" || o.status === "confirmed",
  ).length;
  const lowStock = products.filter((p) => p.stock <= 2 && p.active).length;
  const inactive = products.filter((p) => !p.active).length;
  const marketing = await listMarketingPosts();
  const activeMarketing = marketing.filter((m) => m.active).length;

  const stats = [
    { label: "Total revenue", value: formatTk(revenue) },
    { label: "Orders", value: String(orders.length) },
    { label: "Pending orders", value: String(pending) },
    { label: "Low stock items", value: String(lowStock) },
    { label: "Active products", value: String(products.filter((p) => p.active).length) },
    { label: "Hidden products", value: String(inactive) },
    { label: "Marketing posts", value: String(marketing.length) },
    { label: "Active marketing", value: String(activeMarketing) },
  ];

  return (
    <div>
      <h1 className="font-playfair text-2xl uppercase tracking-wide">Dashboard</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Overview of orders, inventory and marketing activity.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-zinc-200 bg-white p-5">
            <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-playfair text-lg uppercase tracking-wide">Recent orders</h2>
          <Link
            href="/adminpanel/orders"
            className="text-sm text-zinc-600 underline-offset-2 hover:underline"
          >
            View all →
          </Link>
        </div>
        {orders.length === 0 ? (
          <p className="mt-4 border border-zinc-200 bg-white p-6 text-sm text-zinc-500">
            No orders yet. Orders placed through the storefront will appear here.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto border border-zinc-200 bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-xs uppercase tracking-wide text-zinc-500">
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Placed</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 8).map((order) => (
                  <tr key={order.id} className="border-b border-zinc-100 last:border-0">
                    <td className="px-4 py-3">
                      <Link
                        href={`/adminpanel/orders/${order.id}`}
                        className="font-mono text-zinc-900 underline-offset-2 hover:underline"
                      >
                        {order.orderNo}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-zinc-700">{order.name}</td>
                    <td className="px-4 py-3 font-medium text-zinc-900">
                      {formatTk(order.total)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2.5 py-1 text-xs capitalize ${
                          order.status === "delivered"
                            ? "bg-emerald-100 text-emerald-800"
                            : order.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-800"
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

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="border border-zinc-200 bg-white p-6">
          <h2 className="font-playfair text-lg uppercase tracking-wide">Low stock</h2>
          {lowStock === 0 ? (
            <p className="mt-3 text-sm text-zinc-500">All products are well stocked.</p>
          ) : (
            <ul className="mt-4 divide-y divide-zinc-100">
              {products
                .filter((p) => p.stock <= 2 && p.active)
                .slice(0, 6)
                .map((p) => (
                  <li key={p.id} className="flex items-center justify-between py-2.5 text-sm">
                    <Link href={`/adminpanel/products/${p.id}`} className="text-zinc-700 hover:text-zinc-900">
                      {p.name}
                    </Link>
                    <span
                      className={`font-semibold ${
                        p.stock === 0 ? "text-red-600" : "text-amber-600"
                      }`}
                    >
                      {p.stock === 0 ? "Out of stock" : `${p.stock} left`}
                    </span>
                  </li>
                ))}
            </ul>
          )}
          <Link
            href="/adminpanel/products"
            className="mt-4 inline-block text-sm text-zinc-600 underline-offset-2 hover:underline"
          >
            Manage inventory →
          </Link>
        </div>

        <div className="border border-zinc-200 bg-white p-6">
          <h2 className="font-playfair text-lg uppercase tracking-wide">Marketing</h2>
          <p className="mt-3 text-sm text-zinc-500">
            {activeMarketing} of {marketing.length} marketing posts are live on the homepage.
          </p>
          <Link
            href="/adminpanel/marketing"
            className="mt-4 inline-block text-sm text-zinc-600 underline-offset-2 hover:underline"
          >
            Manage marketing posts →
          </Link>
        </div>
      </div>
    </div>
  );
}
