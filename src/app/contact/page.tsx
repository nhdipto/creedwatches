import Link from "next/link";
import { ContactForm } from "@/components/contact/contact-form";
import { contact } from "@/lib/site";

export const metadata = {
  title: "Contact Us | CREED",
  description:
    "Questions about an order, a watch or a warranty? Message CREED's customer care team or call our hotline — we reply within hours.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <div className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-400">
          We&apos;re here to help
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-wide text-black sm:text-5xl">
          Contact Us.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500">
          Whether it&apos;s a product question, an order update or a warranty claim — send us
          a message and our team will reply within store hours.
        </p>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_360px]">
        <ContactForm />

        <aside className="h-fit space-y-6 lg:sticky lg:top-24">
          <div className="border border-zinc-200 p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-900">
              Customer Service
            </h2>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Email
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-1 block text-sm text-zinc-700 hover:text-black"
            >
              {contact.email}
            </a>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Hotline
            </p>
            {contact.online.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="mt-1 block text-sm text-zinc-700 hover:text-black"
              >
                {phone}
              </a>
            ))}
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Hours
            </p>
            <p className="mt-1 text-sm text-zinc-700">
              Sat–Thu 10 AM – 9 PM · Fri 3 PM – 9 PM
            </p>
          </div>

          <div className="border border-zinc-200 p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-900">
              Visit a Store
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              Prefer to talk face to face? Both showrooms have service counters and
              engraving desks.
            </p>
            <Link
              href="/stores"
              className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black underline underline-offset-4 hover:text-zinc-600"
            >
              See our stores
            </Link>
          </div>

          <div className="border border-zinc-200 p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-900">
              Follow CREED
            </h2>
            <p className="mt-3 text-sm text-zinc-600">
              New drops, restocks and store events land on our social feeds first.
            </p>
            <div className="mt-4 flex gap-3">
              {[
                { label: "Facebook", href: contact.social.facebook },
                { label: "Instagram", href: contact.social.instagram },
                { label: "YouTube", href: contact.social.youtube },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-zinc-300 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-700 transition-colors hover:border-zinc-900 hover:text-black"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
