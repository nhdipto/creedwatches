import {
  getProductBySlug,
  listProducts,
} from "@/lib/db";
import {
  galleryFor as staticGalleryFor,
  products as staticProducts,
  type Gender,
  type Product,
} from "@/lib/products";

async function safe(fn: () => Promise<Product[]>): Promise<Product[]> {
  try {
    const rows = await fn();
    return rows.length > 0 ? rows : staticProducts;
  } catch {
    return staticProducts;
  }
}

export async function listCatalog(): Promise<Product[]> {
  return safe(() => listProducts());
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    return await getProductBySlug(slug);
  } catch {
    return staticProducts.find((p) => p.slug === slug) ?? null;
  }
}

export function galleryFor(product: Product): string[] {
  return staticGalleryFor(product);
}

export async function newArrivals(): Promise<Product[]> {
  const list = await listCatalog();
  return [...list].sort((a, b) => b.dateAdded - a.dateAdded).slice(0, 8);
}

const FLASH_SALE_SLUGS = [
  "casio-vintage-data-bank-db-360-1adf",
  "casio-edifice-efs-s570",
  "emporio-armani-luigi-ar1828",
  "seiko-prospex-save-the-ocean-spb297",
  "casio-g-shock-g-land-mudmaster-gg-1000-1adr",
];

export async function flashSale(): Promise<Product[]> {
  const list = await listCatalog();
  const picked = FLASH_SALE_SLUGS.map((slug) => list.find((p) => p.slug === slug)).filter(
    (p): p is Product => Boolean(p),
  );
  return picked.length >= 4 ? picked : list.slice(0, 5);
}

export interface Collection {
  slug: string;
  title: string;
  description: string;
  products: Product[];
}

const categoryTitles: Record<string, string> = {
  chronograph: "Chronograph Watches",
  diving: "Diving Watches",
  dress: "Dress Watches",
  gmt: "GMT & Travel Watches",
  digital: "Digital Watches",
  couple: "Couple Watch Sets",
  sports: "Sports Watches",
};

const movementTitles: Record<string, string> = {
  automatic: "Automatic Watches",
  quartz: "Quartz Watches",
  solar: "Solar Watches",
};

function secondaryFilter(parts: string[], base: Product[]) {
  if (parts.length < 2) return base;
  const key = parts[1];
  if (movementTitles[key]) {
    return base.filter((p) => p.movement === movementTitles[key].split(" ")[0]);
  }
  if (categoryTitles[key]) {
    return base.filter((p) => p.category === categoryTitles[key].split(" ")[0]);
  }
  if (key === "new-arrivals") {
    return [...base].sort((a, b) => b.dateAdded - a.dateAdded).slice(0, 8);
  }
  return base;
}

export async function resolveCollection(parts: string[]): Promise<Collection | null> {
  const slug = parts.join("/");
  const all = await listCatalog();

  if (parts[0] === "brands" && parts[1]) {
    const target = parts[1];
    const matched = all.filter(
      (p) => p.brandSlug === target || p.brandSlug.startsWith(`${target}-`),
    );
    if (matched.length === 0) {
      return {
        slug,
        title: target
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
        description: "This brand is being stocked in an upcoming delivery.",
        products: [],
      };
    }
    const brandName = matched[0].brand;
    return {
      slug,
      title: brandName,
      description: `The complete ${brandName} collection — authorized and original, with nationwide delivery.`,
      products: matched,
    };
  }

  const primary = parts[0] || "all";

  if (primary === "all" || primary === "shop") {
    return {
      slug,
      title: "All Watches",
      description:
        "The full CREED catalogue — from heritage icons to modern microbrands. Filter by brand, gender, price and more.",
      products: all,
    };
  }

  if (primary === "new-arrivals") {
    return {
      slug,
      title: "New Arrivals",
      description: "The latest drops to land on our shelves. Fresh in, flying out.",
      products: [...all].sort((a, b) => b.dateAdded - a.dateAdded).slice(0, 8),
    };
  }

  if (primary === "limited-edition") {
    return {
      slug,
      title: "Limited Editions",
      description:
        "Rare, numbered and gone soon. These are the watches we cannot restock.",
      products: all.filter((p) => p.badge === "LIMITED"),
    };
  }

  if (primary === "the-watch-edit") {
    return {
      slug,
      title: "The Watch Edit",
      description:
        "Our buyers' hand-picked selection — the pieces we'd wear ourselves, every single day.",
      products: all.filter((p) =>
        [
          "seiko-prospex-save-the-ocean-spb297",
          "tissot-prx-powermatic-80-t-gold",
          "longines-spirit-zulu-time-gmt-l38024936",
          "orient-bambino-version-7-cream",
          "zeyron-rosabella-eastern-numeral-aqua-zr-2563",
        ].includes(p.slug),
      ),
    };
  }

  if (primary === "accessories" || primary === "gift-cards") {
    return {
      slug,
      title: primary === "accessories" ? "Watch Accessories" : "Gift Cards",
      description:
        "Straps, winders, care kits and gift cards are arriving with our next shipment. Sign up below to be notified.",
      products: [],
    };
  }

  if (
    primary === "mens-watches" ||
    primary === "ladies-watches" ||
    primary === "couple-watches"
  ) {
    const gender: Gender =
      primary === "mens-watches"
        ? "Men"
        : primary === "ladies-watches"
          ? "Ladies"
          : "Couple";
    const base = all.filter((p) => p.gender === gender);
    const filtered = secondaryFilter(parts, base);
    return {
      slug,
      title: `${gender === "Men" ? "Men's" : gender === "Ladies" ? "Ladies'" : "Couple"} Watches`,
      description:
        gender === "Couple"
          ? "Matched pairs for two — same design, perfect fit. Gift-boxed and ready."
          : `Curated for ${gender.toLowerCase()}. Heritage brands, modern microbrands and the pieces in between.`,
      products: filtered,
    };
  }

  return null;
}
