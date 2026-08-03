import { NextResponse } from "next/server";
import {
  insertAdminProduct,
  type AdminProductInput,
} from "@/lib/db";
import { slugifyBrand } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<AdminProductInput> & { name?: string };
  const name = (body.name ?? "").trim();
  if (!name) {
    return NextResponse.json({ error: "Product name is required." }, { status: 400 });
  }
  const baseSlug = (body.slug ?? "").trim();
  const slug = baseSlug || slugify(name);
  const brand = (body.brand ?? "").trim();
  const brandSlug = body.brandSlug ?? slugifyBrand(brand);
  const id = slug;

  try {
    await insertAdminProduct({
      id,
      slug,
      sku: (body.sku ?? "").trim(),
      brand,
      brandSlug,
      name,
      price: Number(body.price ?? 0),
      compareAt: body.compareAt ? Number(body.compareAt) : null,
      image: (body.image ?? "/images/products/product-01.jpg").trim(),
      badge: (body.badge ?? "").trim() || null,
      gender: (body.gender ?? "Men") as AdminProductInput["gender"],
      category: (body.category ?? "").trim(),
      strap: (body.strap ?? "").trim(),
      dial: (body.dial ?? "").trim(),
      movement: (body.movement ?? "").trim(),
      caseSize: (body.caseSize ?? "").trim(),
      waterResistance: (body.waterResistance ?? "").trim(),
      description: (body.description ?? "").trim(),
      stock: Math.max(0, Math.round(Number(body.stock ?? 0))),
      active: body.active !== false,
    });
  } catch {
    return NextResponse.json(
      { error: "A product with this slug already exists. Choose a different slug." },
      { status: 409 },
    );
  }
  return NextResponse.json({ id });
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
