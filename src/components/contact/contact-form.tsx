"use client";

import { useState } from "react";

const SUBJECTS = [
  "Product enquiry",
  "Order & delivery",
  "Returns & exchange",
  "Warranty & service",
  "Partnership",
  "Other",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setReference(`CREED-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex h-full flex-col items-center justify-center border border-zinc-200 bg-zinc-50 px-6 py-16 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="mt-5 font-display text-2xl font-semibold text-black">
          Message sent, {name.split(" ")[0] || "friend"}.
        </h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-600">
          Thanks for reaching out. Our team typically replies within a few hours during
          store hours — we&apos;ll get back to you at <span className="font-medium text-zinc-900">{email}</span>.
        </p>
        <p className="mt-4 text-xs uppercase tracking-widest text-zinc-400">
          Reference: {reference}
        </p>
      </div>
    );
  }

  const fieldClass =
    "w-full border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-black";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Name *
          </label>
          <input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Email *
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Phone (optional)
          </label>
          <input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+880 1XXX-XXXXXX"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="subject" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Subject *
          </label>
          <select
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={fieldClass}
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Message *
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us how we can help — the watch you're eyeing, your order, or your warranty."
          className={fieldClass + " resize-y"}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-black px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-zinc-800"
      >
        Send message
      </button>
    </form>
  );
}
