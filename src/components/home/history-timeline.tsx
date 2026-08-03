"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/section-header";

interface YearEntry {
  year: string;
  title: string;
  text: string;
}

const timeline: YearEntry[] = [
  {
    year: "2017",
    title: "Where It All Began",
    text: "With just a handful of watches sold in 36 hours, a passion turned into a mission to make watches accessible. CREED was born — dedicated solely to timepieces and the stories they tell.",
  },
  {
    year: "2018",
    title: "First Steps in the Real World",
    text: "The dream took shape in brick and mortar. Our very first physical shop opened its doors, and every tick of the clock brought new faces and new trust.",
  },
  {
    year: "2019",
    title: "Growing Beyond Expectations",
    text: "We expanded fast and wide — at one point running multiple shops filled with countless brands and choices. Our first website opened a new digital window for watch lovers.",
  },
  {
    year: "2020",
    title: "Resilience in Crisis",
    text: "COVID-19 struck and our shops closed for months. But our spirit wasn't. We packed orders from home, delivering watches ourselves and keeping the promise alive.",
  },
  {
    year: "2021",
    title: "Recognition Across the Country",
    text: "Word spread far. Customers from all corners of the country reached out, and the positive response was overwhelming — a reward for every effort.",
  },
  {
    year: "2022",
    title: "Expanding Our Horizons",
    text: "A dedicated outlet opened, and we earned our first official dealerships from respected brands. We redefined our online experience to be smoother and faster.",
  },
  {
    year: "2023",
    title: "Half a Million Hearts",
    text: "Our community crossed 500,000 followers online. Each one a friend, a believer in our journey — proof that watches still connect people.",
  },
  {
    year: "2024",
    title: "Building the Core",
    text: "We set up a dedicated office and operations team, designed to serve our online customers better. A promise of efficiency and care.",
  },
  {
    year: "2025",
    title: "A New Chapter",
    text: "A new showroom and a flagship space celebrate our past — and welcome the future of CREED. From heritage names to independent watch culture.",
  },
];

export function HistoryTimeline() {
  const [selected, setSelected] = useState(timeline.length - 1);
  const entry = timeline[selected];

  return (
    <section className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <SectionHeader
        eyebrow="Our journey"
        title="Where It All Began."
        sub="Click a year to follow the story behind CREED."
      />

      <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:items-center">
        <div className="lg:w-1/2">
          <div className="flex items-center gap-4">
            <span className="font-display text-7xl font-semibold text-zinc-200 sm:text-8xl">
              {entry.year}
            </span>
          </div>
          <h3 className="mt-2 font-display text-3xl font-medium tracking-wide text-black">
            {entry.title}
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-600">
            {entry.text}
          </p>
        </div>

        <div className="lg:w-1/2">
          <div className="overflow-x-auto pb-2 no-scrollbar">
            <div className="flex min-w-max gap-3 lg:grid lg:min-w-0 lg:grid-cols-3 lg:gap-3">
              {timeline.map((t, i) => (
                <button
                  key={t.year}
                  onClick={() => setSelected(i)}
                  aria-pressed={i === selected}
                  className={
                    "flex h-14 w-20 items-center justify-center border text-sm font-medium tracking-widest transition-colors lg:w-auto " +
                    (i === selected
                      ? "border-black bg-black text-white"
                      : "border-zinc-300 text-zinc-600 hover:border-black hover:text-black")
                  }
                >
                  {t.year}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
