interface InfoSection {
  heading: string;
  body: string[];
}

export function InfoPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: InfoSection[];
}) {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <div className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-400">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-wide text-black sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500">
          {intro}
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-3xl space-y-12">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-display text-xl font-semibold tracking-wide text-black">
              {section.heading}
            </h2>
            {section.body.map((paragraph, i) => (
              <p key={i} className="mt-3 text-sm leading-relaxed text-zinc-600">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
