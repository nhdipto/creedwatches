import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { products, type Product } from "@/lib/products";
import { posts } from "@/lib/blog";
import { ensureDbReady, persistDb, dbPath } from "@/lib/storage";

let db: DatabaseSync | null = null;

function closeDb(): void {
  if (db) {
    try {
      db.close();
    } catch {
      // Ignore close errors; a fresh connection replaces it.
    }
    db = null;
  }
}

async function readyDb(): Promise<DatabaseSync> {
  const refreshed = await ensureDbReady();
  if (refreshed) closeDb();
  return getDb();
}

export function getDb(): DatabaseSync {
  if (db) return db;
  mkdirSync(dirname(dbPath()), { recursive: true });
  db = new DatabaseSync(dbPath());
  db.exec("PRAGMA journal_mode = WAL;");
  migrate(db);
  seedIfNeeded(db);
  return db;
}

async function persist(): Promise<void> {
  try {
    db?.exec("PRAGMA wal_checkpoint(TRUNCATE)");
  } catch {
    // Best-effort checkpoint; local writes still succeed.
  }
  await persistDb();
}

function migrate(d: DatabaseSync) {
  d.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE,
      sku TEXT,
      brand TEXT,
      brand_slug TEXT,
      name TEXT,
      price INTEGER,
      compare_at INTEGER,
      image TEXT,
      badge TEXT,
      gender TEXT,
      category TEXT,
      strap TEXT,
      dial TEXT,
      movement TEXT,
      case_size TEXT,
      water_resistance TEXT,
      description TEXT,
      rating REAL,
      reviews INTEGER,
      date_added INTEGER,
      stock INTEGER DEFAULT 0,
      active INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_no TEXT UNIQUE,
      name TEXT,
      phone TEXT,
      email TEXT,
      address TEXT,
      city TEXT,
      notes TEXT,
      subtotal INTEGER,
      delivery_fee INTEGER,
      total INTEGER,
      payment_method TEXT DEFAULT 'bKash',
      trx_id TEXT,
      status TEXT DEFAULT 'awaiting_payment',
      courier TEXT,
      tracking_no TEXT,
      created_at TEXT,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER,
      product_id TEXT,
      title TEXT,
      price INTEGER,
      quantity INTEGER,
      image TEXT
    );

    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE,
      title TEXT,
      excerpt TEXT,
      category TEXT,
      date TEXT,
      read_time TEXT,
      image TEXT,
      author TEXT,
      content_json TEXT,
      published INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS marketing_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      body TEXT,
      cta_text TEXT,
      cta_href TEXT,
      active INTEGER DEFAULT 1,
      created_at TEXT
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);
}

function stockFor(i: number): number {
  if (i % 11 === 0) return 1;
  if (i % 13 === 0) return 2;
  if (i % 7 === 0) return 0;
  return 8 + ((i * 7) % 15);
}

function seedIfNeeded(d: DatabaseSync) {
  const row = d.prepare("SELECT value FROM settings WHERE key = ?").get("seeded");
  if (row) return;

  const insertProduct = d.prepare(`
    INSERT INTO products (
      id, slug, sku, brand, brand_slug, name, price, compare_at, image, badge,
      gender, category, strap, dial, movement, case_size, water_resistance,
      description, rating, reviews, date_added, stock, active
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1
    )
  `);
  products.forEach((p, i) => {
    insertProduct.run(
      p.id,
      p.slug,
      p.sku,
      p.brand,
      p.brandSlug,
      p.name,
      p.price,
      p.compareAt ?? null,
      p.image,
      p.badge ?? null,
      p.gender,
      p.category,
      p.strap,
      p.dial,
      p.movement,
      p.caseSize,
      p.waterResistance,
      p.description,
      p.rating,
      p.reviews,
      p.dateAdded,
      stockFor(i),
    );
  });

  const insertPost = d.prepare(`
    INSERT INTO blog_posts (slug, title, excerpt, category, date, read_time, image, author, content_json, published)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
  `);
  posts.forEach((post) => {
    insertPost.run(
      post.slug,
      post.title,
      post.excerpt,
      post.category,
      post.date,
      post.readTime,
      post.image,
      post.author,
      JSON.stringify(post.content),
    );
  });

  const insertMarketing = d.prepare(`
    INSERT INTO marketing_posts (title, body, cta_text, cta_href, active, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const now = new Date().toISOString();
  [
    {
      title: "BESTOW FREE ENGRAVING — INSTORE, DONE IN MINUTES",
      body: "Personalise any watch with free in-store engraving for a limited time. Visit the Dhanmondi or Gulshan showroom.",
      ctaText: "Visit a store",
      ctaHref: "/stores",
    },
    {
      title: "NATIONWIDE DELIVERY IN 72 HOURS",
      body: "Every order ships insured to all 64 districts within 72 hours — with SMS tracking updates along the way.",
      ctaText: "Shop now",
      ctaHref: "/shop",
    },
    {
      title: "COUPLE SET GIFT SEASON",
      body: "Matched automatic pairs, beautifully gift-boxed. Perfect for the two of you.",
      ctaText: "Browse couple watches",
      ctaHref: "/shop/couple-watches",
    },
  ].forEach((m) => {
    insertMarketing.run(m.title, m.body, m.ctaText, m.ctaHref, 1, now);
  });

  d.prepare("INSERT INTO settings (key, value) VALUES (?, ?)").run("seeded", "1");
}

export function mapProduct(row: Record<string, unknown>): Product {
  return {
    id: String(row.id),
    slug: String(row.slug),
    sku: String(row.sku ?? ""),
    brand: String(row.brand),
    brandSlug: String(row.brand_slug),
    name: String(row.name),
    price: Number(row.price),
    compareAt: row.compare_at == null ? undefined : Number(row.compare_at),
    image: String(row.image),
    badge: row.badge == null ? undefined : String(row.badge),
    gender: row.gender as Product["gender"],
    category: String(row.category),
    strap: String(row.strap),
    dial: String(row.dial),
    movement: String(row.movement),
    caseSize: String(row.case_size),
    waterResistance: String(row.water_resistance),
    description: String(row.description),
    rating: Number(row.rating),
    reviews: Number(row.reviews),
    dateAdded: Number(row.date_added),
  };
}

export interface Order {
  id: number;
  orderNo: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  trxId: string;
  status: string;
  courier: string;
  trackingNo: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export function mapOrder(row: Record<string, unknown>, items: OrderItem[]): Order {
  return {
    id: Number(row.id),
    orderNo: String(row.order_no),
    name: String(row.name),
    phone: String(row.phone),
    email: String(row.email),
    address: String(row.address),
    city: String(row.city),
    notes: String(row.notes ?? ""),
    subtotal: Number(row.subtotal),
    deliveryFee: Number(row.delivery_fee),
    total: Number(row.total),
    paymentMethod: String(row.payment_method),
    trxId: String(row.trx_id ?? ""),
    status: String(row.status),
    courier: String(row.courier ?? ""),
    trackingNo: String(row.tracking_no ?? ""),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    items,
  };
}

export function mapOrderItem(row: Record<string, unknown>): OrderItem {
  return {
    id: Number(row.id),
    productId: String(row.product_id),
    title: String(row.title),
    price: Number(row.price),
    quantity: Number(row.quantity),
    image: String(row.image ?? ""),
  };
}

export async function listProducts(): Promise<Product[]> {
  const d = await readyDb();
  const rows = d.prepare("SELECT * FROM products WHERE active = 1 ORDER BY date_added DESC").all();
  return rows.map((r) => mapProduct(r as Record<string, unknown>));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const d = await readyDb();
  const row = d.prepare("SELECT * FROM products WHERE slug = ? AND active = 1").get(slug);
  return row ? mapProduct(row as Record<string, unknown>) : null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const d = await readyDb();
  const row = d.prepare("SELECT * FROM products WHERE id = ?").get(id);
  return row ? mapProduct(row as Record<string, unknown>) : null;
}

export async function getStock(id: string): Promise<number> {
  const d = await readyDb();
  const row = d.prepare("SELECT stock FROM products WHERE id = ?").get(id);
  return row ? Number((row as Record<string, unknown>).stock) : 0;
}

export async function insertOrder(input: {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  trxId: string;
  items: { productId: string; title: string; price: number; quantity: number; image: string }[];
}): Promise<Order> {
  const d = await readyDb();
  const now = new Date().toISOString();
  const orderNo = `CRD-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;

  const result = d
    .prepare(
      `INSERT INTO orders (order_no, name, phone, email, address, city, notes, subtotal, delivery_fee, total, payment_method, trx_id, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'bKash', ?, 'awaiting_payment', ?, ?)`,
    )
    .run(
      orderNo,
      input.name,
      input.phone,
      input.email,
      input.address,
      input.city,
      input.notes,
      input.subtotal,
      input.deliveryFee,
      input.total,
      input.trxId,
      now,
      now,
    );

  const orderId = Number(result.lastInsertRowid);

  const insertItem = d.prepare(
    `INSERT INTO order_items (order_id, product_id, title, price, quantity, image)
     VALUES (?, ?, ?, ?, ?, ?)`,
  );
  const decrStock = d.prepare(
    "UPDATE products SET stock = stock - ? WHERE id = ?",
  );
  input.items.forEach((item) => {
    insertItem.run(orderId, item.productId, item.title, item.price, item.quantity, item.image);
    decrStock.run(item.quantity, item.productId);
  });

  await persist();
  return (await getOrder(orderId)) as Order;
}

export async function getOrder(id: number): Promise<Order | null> {
  const d = await readyDb();
  const row = d.prepare("SELECT * FROM orders WHERE id = ?").get(id);
  if (!row) return null;
  const items = d
    .prepare("SELECT * FROM order_items WHERE order_id = ?")
    .all(id)
    .map((r) => mapOrderItem(r as Record<string, unknown>));
  return mapOrder(row as Record<string, unknown>, items);
}

export async function getOrderByNo(orderNo: string): Promise<Order | null> {
  const d = await readyDb();
  const row = d.prepare("SELECT * FROM orders WHERE order_no = ?").get(orderNo);
  if (!row) return null;
  const id = Number((row as Record<string, unknown>).id);
  const items = d
    .prepare("SELECT * FROM order_items WHERE order_id = ?")
    .all(id)
    .map((r) => mapOrderItem(r as Record<string, unknown>));
  return mapOrder(row as Record<string, unknown>, items);
}

export async function listOrders(): Promise<Order[]> {
  const d = await readyDb();
  const rows = d.prepare("SELECT * FROM orders ORDER BY created_at DESC").all();
  return rows.map((r) => {
    const record = r as Record<string, unknown>;
    const items = d
      .prepare("SELECT * FROM order_items WHERE order_id = ?")
      .all(Number(record.id))
      .map((i) => mapOrderItem(i as Record<string, unknown>));
    return mapOrder(record, items);
  });
}

export async function updateOrderStatus(id: number, status: string): Promise<void> {
  const d = await readyDb();
  d.prepare("UPDATE orders SET status = ?, updated_at = ? WHERE id = ?").run(
    status,
    new Date().toISOString(),
    id,
  );
  await persist();
}

export async function updateOrderTracking(id: number, courier: string, trackingNo: string): Promise<void> {
  const d = await readyDb();
  d.prepare(
    "UPDATE orders SET courier = ?, tracking_no = ?, status = CASE WHEN status = 'processing' THEN 'shipped' ELSE status END, updated_at = ? WHERE id = ?",
  ).run(courier, trackingNo, new Date().toISOString(), id);
  await persist();
}

export interface AdminProductInput {
  slug: string;
  sku: string;
  brand: string;
  brandSlug: string;
  name: string;
  price: number;
  compareAt: number | null;
  image: string;
  badge: string | null;
  gender: Product["gender"];
  category: string;
  strap: string;
  dial: string;
  movement: string;
  caseSize: string;
  waterResistance: string;
  description: string;
  stock: number;
  active: boolean;
}

export async function adminProduct(id: string, data: AdminProductInput): Promise<void> {
  const d = await readyDb();
  d.prepare(
    `UPDATE products SET slug = ?, sku = ?, brand = ?, brand_slug = ?, name = ?, price = ?, compare_at = ?,
     image = ?, badge = ?, gender = ?, category = ?, strap = ?, dial = ?, movement = ?, case_size = ?,
     water_resistance = ?, description = ?, stock = ?, active = ?
     WHERE id = ?`,
  ).run(
    data.slug,
    data.sku,
    data.brand,
    data.brandSlug,
    data.name,
    data.price,
    data.compareAt,
    data.image,
    data.badge,
    data.gender,
    data.category,
    data.strap,
    data.dial,
    data.movement,
    data.caseSize,
    data.waterResistance,
    data.description,
    data.stock,
    data.active ? 1 : 0,
    id,
  );
  await persist();
}

export async function insertAdminProduct(data: AdminProductInput & { id: string }): Promise<string> {
  const d = await readyDb();
  const id = data.id;
  d.prepare(
    `INSERT INTO products (id, slug, sku, brand, brand_slug, name, price, compare_at, image, badge,
     gender, category, strap, dial, movement, case_size, water_resistance, description, rating, reviews,
     date_added, stock, active)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 4.5, 0, ?, ?, 1)`,
  ).run(
    id,
    data.slug,
    data.sku,
    data.brand,
    data.brandSlug,
    data.name,
    data.price,
    data.compareAt,
    data.image,
    data.badge,
    data.gender,
    data.category,
    data.strap,
    data.dial,
    data.movement,
    data.caseSize,
    data.waterResistance,
    data.description,
    Date.now(),
    data.stock,
  );
  await persist();
  return id;
}

export async function deleteAdminProduct(id: string): Promise<void> {
  const d = await readyDb();
  d.prepare("DELETE FROM products WHERE id = ?").run(id);
  await persist();
}

export async function setSetting(key: string, value: string): Promise<void> {
  const d = await readyDb();
  d.prepare("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value")
    .run(key, value);
  await persist();
}

export async function getSetting(key: string): Promise<string | null> {
  const d = await readyDb();
  const row = d.prepare("SELECT value FROM settings WHERE key = ?").get(key);
  return row ? String((row as Record<string, unknown>).value) : null;
}

export interface BlogPostRow {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  content: string[];
  published: boolean;
}

function mapBlogPost(record: Record<string, unknown>): BlogPostRow {
  return {
    id: Number(record.id),
    slug: String(record.slug),
    title: String(record.title),
    excerpt: String(record.excerpt),
    category: String(record.category),
    date: String(record.date),
    readTime: String(record.read_time),
    image: String(record.image),
    author: String(record.author),
    content: JSON.parse(String(record.content_json)),
    published: Number(record.published) === 1,
  };
}

export async function listBlogPosts(): Promise<BlogPostRow[]> {
  const d = await readyDb();
  const rows = d.prepare("SELECT * FROM blog_posts ORDER BY published DESC, date DESC").all();
  return rows.map((r) => mapBlogPost(r as Record<string, unknown>));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostRow | null> {
  const d = await readyDb();
  const row = d.prepare("SELECT * FROM blog_posts WHERE slug = ?").get(slug);
  return row ? mapBlogPost(row as Record<string, unknown>) : null;
}

export async function insertBlogPost(data: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  content: string[];
  published: boolean;
}): Promise<void> {
  const d = await readyDb();
  d.prepare(
    `INSERT INTO blog_posts (slug, title, excerpt, category, date, read_time, image, author, content_json, published)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    data.slug,
    data.title,
    data.excerpt,
    data.category,
    data.date,
    data.readTime,
    data.image,
    data.author,
    JSON.stringify(data.content),
    data.published ? 1 : 0,
  );
  await persist();
}

export async function updateBlogPost(
  id: number,
  data: {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    author: string;
    content: string[];
    published: boolean;
  },
): Promise<void> {
  const d = await readyDb();
  d.prepare(
    `UPDATE blog_posts SET slug = ?, title = ?, excerpt = ?, category = ?, date = ?, read_time = ?,
     image = ?, author = ?, content_json = ?, published = ? WHERE id = ?`,
  ).run(
    data.slug,
    data.title,
    data.excerpt,
    data.category,
    data.date,
    data.readTime,
    data.image,
    data.author,
    JSON.stringify(data.content),
    data.published ? 1 : 0,
    id,
  );
  await persist();
}

export async function deleteBlogPost(id: number): Promise<void> {
  const d = await readyDb();
  d.prepare("DELETE FROM blog_posts WHERE id = ?").run(id);
  await persist();
}

export interface MarketingPost {
  id: number;
  title: string;
  body: string;
  ctaText: string;
  ctaHref: string;
  active: boolean;
  createdAt: string;
}

export async function listMarketingPosts(): Promise<MarketingPost[]> {
  const d = await readyDb();
  const rows = d.prepare("SELECT * FROM marketing_posts ORDER BY created_at DESC").all();
  return rows.map((r) => {
    const record = r as Record<string, unknown>;
    return {
      id: Number(record.id),
      title: String(record.title),
      body: String(record.body),
      ctaText: String(record.cta_text ?? ""),
      ctaHref: String(record.cta_href ?? ""),
      active: Number(record.active) === 1,
      createdAt: String(record.created_at),
    };
  });
}

export async function insertMarketingPost(data: {
  title: string;
  body: string;
  ctaText: string;
  ctaHref: string;
  active: boolean;
}): Promise<void> {
  const d = await readyDb();
  d.prepare(
    `INSERT INTO marketing_posts (title, body, cta_text, cta_href, active, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
  ).run(
    data.title,
    data.body,
    data.ctaText,
    data.ctaHref,
    data.active ? 1 : 0,
    new Date().toISOString(),
  );
  await persist();
}

export async function deleteMarketingPost(id: number): Promise<void> {
  const d = await readyDb();
  d.prepare("DELETE FROM marketing_posts WHERE id = ?").run(id);
  await persist();
}

export interface AdminProductRow {
  id: string;
  slug: string;
  sku: string;
  brand: string;
  brandSlug: string;
  name: string;
  price: number;
  compareAt: number | null;
  image: string;
  badge: string | null;
  gender: Product["gender"];
  category: string;
  strap: string;
  dial: string;
  movement: string;
  caseSize: string;
  waterResistance: string;
  description: string;
  stock: number;
  active: boolean;
}

function mapAdminProductRow(record: Record<string, unknown>): AdminProductRow {
  return {
    id: String(record.id),
    slug: String(record.slug),
    sku: String(record.sku ?? ""),
    brand: String(record.brand),
    brandSlug: String(record.brand_slug ?? ""),
    name: String(record.name),
    price: Number(record.price),
    compareAt: record.compare_at == null ? null : Number(record.compare_at),
    image: String(record.image),
    badge: record.badge == null ? null : String(record.badge),
    gender: String(record.gender) as Product["gender"],
    category: String(record.category ?? ""),
    strap: String(record.strap ?? ""),
    dial: String(record.dial ?? ""),
    movement: String(record.movement ?? ""),
    caseSize: String(record.case_size ?? ""),
    waterResistance: String(record.water_resistance ?? ""),
    description: String(record.description ?? ""),
    stock: Number(record.stock ?? 0),
    active: Number(record.active) === 1,
  };
}

export async function adminListProducts(): Promise<AdminProductRow[]> {
  const d = await readyDb();
  const rows = d.prepare("SELECT * FROM products ORDER BY date_added DESC").all();
  return rows.map((r) => mapAdminProductRow(r as Record<string, unknown>));
}

export async function adminGetProduct(id: string): Promise<AdminProductRow | null> {
  const d = await readyDb();
  const row = d.prepare("SELECT * FROM products WHERE id = ?").get(id);
  return row ? mapAdminProductRow(row as Record<string, unknown>) : null;
}

export async function updateProductStock(id: string, stock: number): Promise<void> {
  const d = await readyDb();
  d.prepare("UPDATE products SET stock = ? WHERE id = ?").run(stock, id);
  await persist();
}

export async function setProductActive(id: string, active: boolean): Promise<void> {
  const d = await readyDb();
  d.prepare("UPDATE products SET active = ? WHERE id = ?").run(active ? 1 : 0, id);
  await persist();
}
