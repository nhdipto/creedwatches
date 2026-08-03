"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { brands, slugifyBrand } from "@/lib/products";
import type { AdminProductRow } from "@/lib/db";

const IMAGE_OPTIONS = Array.from({ length: 37 }, (_, i) =>
  i < 13 ? `/images/products/product-${String(i + 1).padStart(2, "0")}.jpg` : `/images/products/img-${i + 1}.jpg`,
);

const GENDERS = ["Men", "Ladies", "Couple", "Unisex"];
const CATEGORIES = ["Automatic", "Quartz", "Chronograph", "Diving", "Dress", "Heritage", "Couple"];
const MOVEMENTS = ["Automatic", "Quartz", "Kinetic", "Solar", "Mechanical", "Smart"];

export function ProductForm({
  productId,
  initial,
}: {
  productId?: string;
  initial?: AdminProductRow | null;
}) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    slug: initial?.slug ?? "",
    sku: initial?.sku ?? "",
    brand: initial?.brand ?? "Seiko",
    price: initial ? String(initial.price) : "",
    compareAt: initial?.compareAt != null ? String(initial.compareAt) : "",
    image: initial?.image ?? "/images/products/product-01.jpg",
    badge: initial?.badge ?? "",
    gender: initial?.gender ?? "Men",
    category: initial?.category ?? "Automatic",
    strap: initial?.strap ?? "Steel",
    dial: initial?.dial ?? "Black",
    movement: initial?.movement ?? "Automatic",
    caseSize: initial?.caseSize ?? "40mm",
    waterResistance: initial?.waterResistance ?? "10 ATM",
    description: initial?.description ?? "",
    stock: initial ? String(initial.stock) : "10",
    active: initial?.active ?? true,
  });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const set = (key: keyof typeof form) => (value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        compareAt: form.compareAt ? Number(form.compareAt) : undefined,
        stock: Number(form.stock),
        slug: form.slug.trim() || slugifyBrand(form.name),
      };
      const res = await fetch(
        productId ? `/api/admin/products/${productId}` : "/api/admin/products",
        {
          method: productId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to save product.");
        return;
      }
      router.push("/adminpanel/products");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-900 placeholder:text-zinc-400";
  const labelClass = "mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-500";

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div>
          <label className={labelClass}>Name *</label>
          <input
            required
            value={form.name}
            onChange={(e) => {
              set("name")(e.target.value);
              if (!productId && !form.slug) set("slug")(slugifyBrand(e.target.value));
            }}
            className={inputClass}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Brand</label>
            <select value={form.brand} onChange={(e) => set("brand")(e.target.value)} className={inputClass}>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>SKU</label>
            <input value={form.sku} onChange={(e) => set("sku")(e.target.value)} className={inputClass} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Slug</label>
          <input value={form.slug} onChange={(e) => set("slug")(e.target.value)} className={inputClass} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Price (Tk) *</label>
            <input
              required
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => set("price")(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Compare-at price (Tk)</label>
            <input
              type="number"
              min="0"
              value={form.compareAt}
              onChange={(e) => set("compareAt")(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Gender</label>
            <select value={form.gender} onChange={(e) => set("gender")(e.target.value)} className={inputClass}>
              {GENDERS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <select value={form.category} onChange={(e) => set("category")(e.target.value)} className={inputClass}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Movement</label>
            <select value={form.movement} onChange={(e) => set("movement")(e.target.value)} className={inputClass}>
              {MOVEMENTS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Badge</label>
            <input value={form.badge} onChange={(e) => set("badge")(e.target.value)} className={inputClass} />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Strap</label>
            <input value={form.strap} onChange={(e) => set("strap")(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Dial colour</label>
            <input value={form.dial} onChange={(e) => set("dial")(e.target.value)} className={inputClass} />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Case size</label>
            <input value={form.caseSize} onChange={(e) => set("caseSize")(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Water resistance</label>
            <input
              value={form.waterResistance}
              onChange={(e) => set("waterResistance")(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className={labelClass}>Image</label>
          <select value={form.image} onChange={(e) => set("image")(e.target.value)} className={inputClass}>
            {IMAGE_OPTIONS.map((src) => (
              <option key={src} value={src}>
                {src}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Description</label>
          <textarea
            value={form.description}
            onChange={(e) => set("description")(e.target.value)}
            rows={6}
            className={inputClass}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Stock</label>
            <input
              type="number"
              min="0"
              value={form.stock}
              onChange={(e) => set("stock")(e.target.value)}
              className={inputClass}
            />
          </div>
          <label className="flex items-end gap-2 pb-2.5 text-sm text-zinc-700">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => set("active")(e.target.checked)}
              className="h-4 w-4 accent-zinc-900"
            />
            Visible on storefront
          </label>
        </div>
        {error && (
          <p className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-zinc-950 px-6 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : productId ? "Save changes" : "Create product"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/adminpanel/products")}
            className="border border-zinc-300 px-6 py-3 text-sm font-medium uppercase tracking-widest text-zinc-900 transition-colors hover:border-zinc-900"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
