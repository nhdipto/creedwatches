"use client";

import Link from "next/link";
import { useStore } from "@/context/store";
import { nav } from "@/lib/site";
import { Logo } from "@/components/logo";
import { AnnouncementBar } from "./announcement-bar";
import { MobileMenu } from "./mobile-menu";
import { SearchOverlay } from "./search-overlay";
import { CartDrawer } from "./cart-drawer";
import { MegaMenuPanel } from "./mega-menu-panel";
import { BagIcon, ChevronDownIcon, MenuIcon, SearchIcon, UserIcon } from "@/components/icons";

export function Header() {
  const store = useStore();

  const badge =
    store.cartCount > 0 ? (
      <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-zinc-950 px-1 text-[10px] font-bold text-white">
        {store.cartCount}
      </span>
    ) : null;

  return (
    <div className="sticky top-0 z-40">
      <AnnouncementBar />
      <div className="bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10">
          <button onClick={store.openMenu} aria-label="Open menu" className="-ml-1.5 p-1.5 lg:hidden">
            <MenuIcon className="h-6 w-6" />
          </button>

          <Link href="/" aria-label="CREED home" className="flex items-center">
            <Logo />
          </Link>

          <div className="flex items-center gap-3 sm:gap-5">
            <button aria-label="Account" className="hidden p-1.5 text-zinc-800 hover:text-zinc-950 lg:block">
              <UserIcon className="h-5 w-5" />
            </button>
            <button onClick={store.openSearch} aria-label="Search" className="p-1.5 text-zinc-800 hover:text-zinc-950">
              <SearchIcon className="h-5 w-5" />
            </button>
            <button onClick={store.openCart} aria-label="Open cart" className="relative p-1.5 text-zinc-800 hover:text-zinc-950">
              <BagIcon className="h-6 w-6" />
              {badge}
            </button>
          </div>
        </div>

        <div className="hidden lg:block">
          <nav className="border-t border-zinc-100">
            <ul className="mx-auto flex max-w-screen-2xl items-center justify-center gap-10 px-10">
              {nav.map((item) => {
                const hasMega = Boolean(item.megaMenu);
                const linkClass =
                  "block py-4 text-[13px] font-medium uppercase tracking-[0.22em]" +
                  (hasMega ? " flex items-center gap-1.5" : "");
                return (
                  <li key={item.label} className="group relative">
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                      {hasMega ? <ChevronDownIcon className="h-3.5 w-3.5" /> : null}
                    </Link>
                    {hasMega ? <MegaMenuPanel item={item} /> : null}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {store.searchOpen ? <SearchOverlay /> : null}
      <MobileMenu />
      <CartDrawer />
    </div>
  );
}
