import { NextResponse } from "next/server";
import {
  adminProduct,
  deleteAdminProduct,
  adminGetProduct,
  type AdminProductInput,
} from "@/lib/db";
import { slugifyBrand } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function PUT(request: Request, ctx: RouteContext<"/api/admin/products/[id]">) {
  const { id } = await ctx.params;
  if (!(await adminGetProduct(id))) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }
  const body = (await request.json()) as Partial<AdminProductInput> & { name?: string };
  const name = (body.name ?? "").trim();
  if (!name) {
    return NextResponse.json({ error: "Product name is required." }, { status: 400 });
  }
  const brand = (body.brand ?? "").trim();

  await adminProduct(id, {
    slug: (body.slug ?? id).trim(),
    sku: (body.sku ?? "").trim(),
    brand,
    brandSlug: body.brandSlug ?? slugifyBrand(brand),
    name,
    price: Number(body.price ?? 0),
    compareAt: body.compareAt ? Number(body.compareAt) : null,
    image: (body.image ?? "").trim(),
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
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, ctx: RouteContext<"/api/admin/products/[id]">) {
  const { id } = await ctx.params;
  await deleteAdminProduct(id);
  return NextResponse.json({ ok: true });
}
