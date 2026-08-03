"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/context/store";
import { nav, contact } from "@/lib/site";
import {
  CloseIcon,
  ChevronDownIcon,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/icons";

export function MobileMenu() {
  const { menuOpen, closeMenu } = useStore();
  const [shopOpen, setShopOpen] = useState(false);

  if (!menuOpen) return null;

  return (
    <div className="fixed inset-0 z-[55] animate-fade-in bg-white">
      <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
        <span className="text-lg font-semibold tracking-wide">CREED</span>
        <button
          onClick={closeMenu}
          aria-label="Close menu"
          className="p-1 text-zinc-600 hover:text-zinc-900"
        >
          <CloseIcon className="h-6 w-6" />
        </button>
      </div>

      <nav className="max-h-[calc(100vh-4rem)] overflow-y-auto px-5 py-4">
        <ul>
          {nav.map((item) => {
            const isShop = !!item.megaMenu;
            return (
              <li key={item.label} className="border-b border-zinc-100">
                {isShop ? (
                  <>
                    <button
                      onClick={() => setShopOpen((t) => !t)}
                      className="flex w-full items-center justify-between py-4 text-sm font-medium uppercase tracking-widest"
                    >
                      <span>{item.label}</span>
                      <ChevronDownIcon
                        className={
                          "h-4 w-4 transition-transform " +
                          (shopOpen ? "rotate-180" : "")
                        }
                      />
                    </button>
                    {shopOpen && (
                      <div className="pb-4">
                        {item.megaMenu!.columns.map((col) => (
                          <div key={col.title} className="mb-4">
                            <p className="mb-2 text-xs uppercase tracking-widest text-zinc-400">
                              {col.title}
                            </p>
                            <ul className="space-y-1">
                              {col.links.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    onClick={closeMenu}
                                    className="block py-1.5 text-sm text-zinc-700 hover:text-black"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="block py-4 text-sm font-medium uppercase tracking-widest"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-6 pt-4">
          <p className="text-xs uppercase tracking-widest text-zinc-400">
            Follow us
          </p>
          <div className="mt-3 flex gap-5">
            <a
              href={contact.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="text-zinc-700 hover:text-zinc-950"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a
              href={contact.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-zinc-700 hover:text-zinc-950"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={contact.social.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="text-zinc-700 hover:text-zinc-950"
            >
              <YoutubeIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
