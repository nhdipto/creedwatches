import { NextResponse } from "next/server";
import { getOrder, updateOrderTracking } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  ctx: RouteContext<"/api/admin/orders/[id]/tracking">,
) {
  const { id } = await ctx.params;
  if (!(await getOrder(Number(id)))) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }
  const body = (await request.json()) as { courier?: string; trackingNo?: string };
  const courier = (body.courier ?? "").trim();
  const trackingNo = (body.trackingNo ?? "").trim();
  if (!courier || !trackingNo) {
    return NextResponse.json({ error: "Courier and tracking number are required." }, { status: 400 });
  }
  await updateOrderTracking(Number(id), courier, trackingNo);
  return NextResponse.json({ ok: true });
}
