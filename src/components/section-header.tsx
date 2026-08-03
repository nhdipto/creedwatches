interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  sub?: string;
  className?: string;
}

export function SectionHeader({ eyebrow, title, sub, className = "" }: SectionHeaderProps) {
  return (
    <div className={"mx-auto max-w-2xl px-4 text-center sm:px-6 " + className}>
      {eyebrow && (
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-400">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-wide text-black sm:text-4xl">
        {title}
      </h2>
      {sub && <p className="mt-3 text-sm text-zinc-500">{sub}</p>}
    </div>
  );
}
