import { NextResponse } from "next/server";
import { getProductById, getStock, insertOrder } from "@/lib/db";

export const dynamic = "force-dynamic";

const BKASH_NUMBER = "01703-567093";
const FREE_DELIVERY_THRESHOLD = 15000;
const DELIVERY_FEE = 120;

export async function POST(request: Request) {
  let body: {
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
    city?: string;
    notes?: string;
    trxId?: string;
    items?: { id: string; quantity: number }[];
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const address = (body.address ?? "").trim();
  const city = (body.city ?? "").trim();
  const trxId = (body.trxId ?? "").trim();
  const email = (body.email ?? "").trim();
  const notes = (body.notes ?? "").trim();

  if (!name || !phone || !address || !city) {
    return NextResponse.json(
      { error: "Please fill in your name, phone, address and city." },
      { status: 400 },
    );
  }
  if (!/^(\+?880|0)1[3-9]\d{8}$/.test(phone.replace(/[\s-]/g, ""))) {
    return NextResponse.json(
      { error: "Please enter a valid Bangladeshi phone number." },
      { status: 400 },
    );
  }
  if (!trxId) {
    return NextResponse.json(
      { error: `Please enter your bKash Send Money TrxID.`, status: 400 },
      { status: 400 },
    );
  }
  if (!body.items || body.items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  let subtotal = 0;
  const lines = [];
  for (const line of body.items) {
    const product = await getProductById(line.id);
    if (!product) {
      return NextResponse.json(
        { error: "One of your items is no longer available." },
        { status: 400 },
      );
    }
    const quantity = Math.max(1, Math.min(10, Math.round(line.quantity)));
    const stock = await getStock(line.id);
    if (stock < quantity) {
      return NextResponse.json(
        { error: `${product.name} has only ${stock} unit${stock === 1 ? "" : "s"} left in stock.` },
        { status: 400 },
      );
    }
    subtotal += product.price * quantity;
    lines.push({
      productId: product.id,
      title: product.name,
      price: product.price,
      quantity,
      image: product.image,
    });
  }

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  const order = await insertOrder({
    name,
    phone,
    email,
    address,
    city,
    notes,
    subtotal,
    deliveryFee,
    total,
    trxId,
    items: lines,
  });

  return NextResponse.json({
    orderNo: order.orderNo,
    total,
    bkashNumber: BKASH_NUMBER,
  });
}
