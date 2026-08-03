"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="bg-zinc-950 px-6 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-zinc-800"
    >
      Print / Save PDF
    </button>
  );
}
