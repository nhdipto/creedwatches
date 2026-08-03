import { NextResponse } from "next/server";
import { deleteMarketingPost } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function DELETE(_request: Request, ctx: RouteContext<"/api/admin/marketing/[id]">) {
  const { id } = await ctx.params;
  await deleteMarketingPost(Number(id));
  return NextResponse.json({ ok: true });
}
