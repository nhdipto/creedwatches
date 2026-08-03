export const siteName = "CREED";

export interface NavItem {
  label: string;
  href: string;
  megaMenu?: {
    columns: { title: string; links: { label: string; href: string }[] }[];
    brands: string[];
  };
}

export const announcementMessages = [
  "BESPOKE WATCH ENGRAVING. IN-STORE. DONE IN MINUTES.",
  "AUTHORIZED & ORIGINAL • HERITAGE BRANDS • MODERN MICROBRANDS",
  "NATIONWIDE DELIVERY ACROSS ALL 64 DISTRICTS IN 72 HOURS",
];

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Shop",
    href: "/shop",
    megaMenu: {
      columns: [
        {
          title: "Men's Watches",
          links: [
            { label: "All Men's Watches", href: "/shop/mens-watches" },
            { label: "New Arrivals", href: "/shop/new-arrivals" },
            { label: "Automatic", href: "/shop/mens-watches/automatic" },
            { label: "Chronograph", href: "/shop/mens-watches/chronograph" },
            { label: "Diving Watches", href: "/shop/mens-watches/diving" },
          ],
        },
        {
          title: "Ladies Watches",
          links: [
            { label: "All Ladies Watches", href: "/shop/ladies-watches" },
            { label: "New Arrivals", href: "/shop/ladies-watches/new-arrivals" },
            { label: "Quartz", href: "/shop/ladies-watches/quartz" },
            { label: "Dress Watches", href: "/shop/ladies-watches/dress" },
            { label: "Couple Watches", href: "/shop/couple-watches" },
          ],
        },
        {
          title: "Collections",
          links: [
            { label: "All Watches", href: "/shop/all" },
            { label: "Limited Editions", href: "/shop/limited-edition" },
            { label: "The Watch Edit", href: "/shop/the-watch-edit" },
            { label: "Watch Accessories", href: "/shop/accessories" },
            { label: "Gift Cards", href: "/shop/gift-cards" },
          ],
        },
      ],
      brands: [
        "SEVENFRIDAY",
        "Seiko",
        "Casio",
        "Citizen",
        "Orient",
        "Tissot",
        "Longines",
        "Rado",
        "Hamilton",
        "Fossil",
        "Emporio Armani",
        "Zeyron",
      ],
    },
  },
  { label: "Watch Accessories", href: "/shop/accessories" },
  { label: "Journal", href: "/blog" },
  { label: "Our Stores", href: "/stores" },
  { label: "Contact", href: "/contact" },
];

export const stores = [
  {
    name: "STORE 1 — DHANMONDI",
    address:
      "Shimanto Shambhar Shopping Complex, Level-3, Shop 3100-3102, Dhanmondi 2, Dhaka 1205",
    phone: "+880 1842-663432",
  },
  {
    name: "STORE 2 — GULSHAN",
    address:
      "Rangs FC Enclave, 8th Floor, Unit A, Plot 6/A, Road 32, Gulshan Avenue, Dhaka 1212",
    phone: "+880 1332-114180",
  },
];

export const contact = {
  online: ["+880 1703-567093", "+880 1766-347495"],
  email: "care@creedwatches.com",
  social: {
    facebook: "https://facebook.com/creedwatches",
    instagram: "https://instagram.com/creedwatches",
    youtube: "https://youtube.com/@creedwatches",
  },
};

export const informationLinks = [
  { label: "About", href: "/about" },
  { label: "Beyond the Dial (Blog)", href: "/blog" },
  { label: "Our Stores", href: "/stores" },
  { label: "Contact", href: "/contact" },
  { label: "Track Order", href: "/order-status" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund Policy", href: "/refund" },
  { label: "Shipping Information", href: "/shipping" },
];

export const trustBadges = [
  {
    title: "Secure Payments",
    description: "bKash, Nagad & bank transfer",
    icon: "shield",
  },
  {
    title: "Authentic & Original",
    description: "100% genuine watches, guaranteed",
    icon: "badge",
  },
  {
    title: "Nationwide Delivery",
    description: "Across 64 districts within 72 hours",
    icon: "truck",
  },
];
