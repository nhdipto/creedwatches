import Link from "next/link";
import {
  contact,
  informationLinks,
  siteName,
  stores,
  trustBadges,
} from "@/lib/site";
import { NewsletterForm } from "@/components/newsletter-form";
import {
  BadgeIcon,
  FacebookIcon,
  InstagramIcon,
  ShieldIcon,
  TruckIcon,
  YoutubeIcon,
} from "@/components/icons";

const badgeIcons = {
  shield: ShieldIcon,
  badge: BadgeIcon,
  truck: TruckIcon,
} as const;

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-300">
      {/* Trust badges */}
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-10">
          {trustBadges.map((badge) => {
            const Icon = badgeIcons[badge.icon as keyof typeof badgeIcons];
            return (
              <div key={badge.title} className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-medium uppercase tracking-widest text-white">
                    {badge.title}
                  </p>
                  <p className="mt-0.5 text-sm text-zinc-400">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main columns */}
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_1fr_1.2fr_1.4fr] lg:px-10">
        <div>
          <p className="font-display text-3xl font-semibold tracking-wide text-white">
            {siteName}
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
            Curated watches from heritage names to independent watch culture.
            Authentic, original, and delivered nationwide.
          </p>
          <div className="mt-6 flex gap-5">
            <a
              href={contact.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="text-zinc-400 transition-colors hover:text-white"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a
              href={contact.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-zinc-400 transition-colors hover:text-white"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={contact.social.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="text-zinc-400 transition-colors hover:text-white"
            >
              <YoutubeIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white">
            Information
          </p>
          <ul className="mt-5 space-y-3">
            {informationLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white">
            Contact Info
          </p>
          <ul className="mt-5 space-y-5 text-sm leading-relaxed text-zinc-400">
            {stores.map((store) => (
              <li key={store.name}>
                <p className="text-xs font-medium uppercase tracking-widest text-zinc-300">
                  {store.name}
                </p>
                <p className="mt-1">{store.address}</p>
                <p className="mt-1">{store.phone}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-zinc-400">
            Online: {contact.online.join(" • ")}
            <br />
            {contact.email}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white">
            Join Our Newsletter
          </p>
          <p className="mt-4 text-sm text-zinc-400">
            Subscribe to get offers, new arrivals, and watch culture stories.
          </p>
          <div className="mt-5">
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-zinc-500 sm:flex-row sm:px-6 lg:px-10">
          <p>© {new Date().getFullYear()} {siteName} Watches. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-zinc-300">
              Privacy Policy
            </Link>
            <Link href="/refund" className="hover:text-zinc-300">
              Refund Policy
            </Link>
            <Link href="/shipping" className="hover:text-zinc-300">
              Shipping
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
