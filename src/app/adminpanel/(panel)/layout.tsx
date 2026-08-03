import type { ReactNode } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE } from "@/lib/admin";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  if (cookieStore.get(ADMIN_COOKIE)?.value !== "1") {
    redirect("/adminpanel/login");
  }

  const links = [
    { label: "Dashboard", href: "/adminpanel" },
    { label: "Orders", href: "/adminpanel/orders" },
    { label: "Products & Inventory", href: "/adminpanel/products" },
    { label: "Marketing Posts", href: "/adminpanel/marketing" },
    { label: "Blog Management", href: "/adminpanel/blog" },
  ];

  return (
    <main className="min-h-screen bg-zinc-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col justify-between border-r border-zinc-200 bg-white px-6 py-8 md:flex">
          <div>
            <Link href="/adminpanel" className="block">
              <h1 className="font-playfair text-2xl uppercase tracking-wide">CREED</h1>
              <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-zinc-400">
                Admin Panel
              </p>
            </Link>
            <nav className="mt-10 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block border-l-2 border-transparent px-3 py-2 text-sm text-zinc-600 transition-colors hover:border-zinc-900 hover:text-zinc-900"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="space-y-2">
            <Link
              href="/"
              className="block text-sm text-zinc-500 transition-colors hover:text-zinc-900"
            >
              View storefront →
            </Link>
            <AdminLogoutButton />
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-4 md:hidden">
            <span className="font-playfair text-lg uppercase tracking-wide">CREED Admin</span>
            <AdminLogoutButton />
          </div>
          <nav className="flex gap-1 overflow-x-auto border-b border-zinc-200 bg-white px-4 py-2 md:hidden">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap px-3 py-1.5 text-xs uppercase tracking-wide text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="px-6 py-8 md:px-10">{children}</div>
        </div>
      </div>
    </main>
  );
}
