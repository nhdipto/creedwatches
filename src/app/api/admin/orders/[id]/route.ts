import { NextResponse } from "next/server";
import { getOrder, updateOrderStatus } from "@/lib/db";

export const dynamic = "force-dynamic";

const STATUSES = ["awaiting_payment", "confirmed", "shipped", "delivered", "cancelled"];

export async function PATCH(request: Request, ctx: RouteContext<"/api/admin/orders/[id]">) {
  const { id } = await ctx.params;
  if (!(await getOrder(Number(id)))) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }
  const body = (await request.json()) as { status?: string };
  if (!body.status || !STATUSES.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }
  await updateOrderStatus(Number(id), body.status);
  return NextResponse.json({ ok: true });
}
