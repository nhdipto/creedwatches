import { NextResponse } from "next/server";
import { adminGetProduct, setProductActive, updateProductStock } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, ctx: RouteContext<"/api/admin/products/[id]/stock">) {
  const { id } = await ctx.params;
  if (!(await adminGetProduct(id))) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }
  const body = (await request.json()) as { stock?: number; active?: boolean };
  if (typeof body.stock === "number") {
    await updateProductStock(id, Math.max(0, Math.round(body.stock)));
  }
  if (typeof body.active === "boolean") {
    await setProductActive(id, body.active);
  }
  return NextResponse.json({ ok: true });
}
