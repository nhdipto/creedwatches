import Link from "next/link";
import { adminListProducts } from "@/lib/db";
import { formatTk } from "@/lib/products";
import { ProductRowActions } from "@/components/admin/product-row-actions";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await adminListProducts();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair text-2xl uppercase tracking-wide">Products & Inventory</h1>
          <p className="mt-1 text-sm text-zinc-500">
            {products.length} products total. Set stock, hide products, or edit details.
          </p>
        </div>
        <Link
          href="/adminpanel/products/new"
          className="bg-zinc-950 px-6 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-zinc-800"
        >
          Add product
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto border border-zinc-200 bg-white">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 text-xs uppercase tracking-wide text-zinc-500">
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Brand</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-zinc-100 last:border-0">
                <td className="px-4 py-3">
                  <Link
                    href={`/adminpanel/products/${product.id}`}
                    className="font-medium text-zinc-900 underline-offset-2 hover:underline"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-0.5 font-mono text-xs text-zinc-400">{product.sku}</p>
                </td>
                <td className="px-4 py-3 text-zinc-700">{product.brand}</td>
                <td className="px-4 py-3">
                  <span className="font-medium text-zinc-900">{formatTk(product.price)}</span>
                  {product.compareAt && (
                    <span className="ml-2 text-xs text-zinc-400 line-through">
                      {formatTk(product.compareAt)}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <ProductRowActions id={product.id} stock={product.stock} active={product.active} />
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-medium ${
                      product.stock === 0
                        ? "text-red-600"
                        : product.stock <= 2
                          ? "text-amber-600"
                          : "text-emerald-700"
                    }`}
                  >
                    {product.stock === 0
                      ? "Out of stock"
                      : product.stock <= 2
                        ? "Low stock"
                        : "In stock"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/adminpanel/products/${product.id}`}
                    className="text-sm text-zinc-600 underline-offset-2 hover:underline"
                  >
                    Edit →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
