"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function MarketingForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    body: "",
    ctaText: "",
    ctaHref: "",
    active: true,
  });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const set = (key: keyof typeof form) => (value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/admin/marketing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to create post.");
      setForm({ title: "", body: "", ctaText: "", ctaHref: "", active: true });
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const inputClass =
    "w-full border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-zinc-900";

  return (
    <form onSubmit={submit} className="space-y-4">
      <input
        required
        value={form.title}
        onChange={(e) => set("title")(e.target.value)}
        placeholder="Post title *"
        className={inputClass}
      />
      <textarea
        value={form.body}
        onChange={(e) => set("body")(e.target.value)}
        placeholder="Body copy"
        rows={3}
        className={inputClass}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          value={form.ctaText}
          onChange={(e) => set("ctaText")(e.target.value)}
          placeholder="Button text (e.g. Shop the sale)"
          className={inputClass}
        />
        <input
          value={form.ctaHref}
          onChange={(e) => set("ctaHref")(e.target.value)}
          placeholder="Button link (e.g. /shop/limited-edition)"
          className={inputClass}
        />
      </div>
      <label className="flex items-center gap-2 text-sm text-zinc-700">
        <input
          type="checkbox"
          checked={form.active}
          onChange={(e) => set("active")(e.target.checked)}
          className="h-4 w-4 accent-zinc-900"
        />
        Live on homepage
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={busy}
        className="bg-zinc-950 px-6 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-zinc-800 disabled:opacity-60"
      >
        {busy ? "Creating..." : "Create post"}
      </button>
    </form>
  );
}
