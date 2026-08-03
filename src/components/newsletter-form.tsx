"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    setEmail("");
  }

  if (done) {
    return (
      <p className="text-sm text-zinc-400">
        Thank you for subscribing. Welcome to the CREED inner circle.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-sm">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        aria-label="Email address"
        className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:border-white focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 bg-white px-5 text-xs font-semibold uppercase tracking-widest text-zinc-950 transition-colors hover:bg-zinc-200"
      >
        Subscribe
      </button>
    </form>
  );
}
