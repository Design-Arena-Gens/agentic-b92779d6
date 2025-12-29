"use client";

interface HeroProps {
  weeksRemaining: number;
}

const highlights = [
  {
    label: "Multi-Subject Orchestration",
    detail: "Prioritize mastery gaps across quantitative, analytical, and verbal domains.",
  },
  {
    label: "Adaptive Practice Engine",
    detail: "Generate exam-grade prompts with reflective tagging for error harvesting.",
  },
  {
    label: "Execution Rituals",
    detail: "Daily cadence blueprints to sustain focus, pacing, and revision cadence.",
  },
];

export function Hero({ weeksRemaining }: HeroProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 p-8 shadow-xl shadow-emerald-200/50 dark:border-emerald-500/40 dark:from-emerald-900/30 dark:via-zinc-950 dark:to-emerald-800/40">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 shadow-sm dark:bg-emerald-500/20 dark:text-emerald-200">
            Competitive Exam Strategist
          </div>
          <h1 className="mt-5 text-3xl font-bold leading-tight text-emerald-900 dark:text-emerald-200 md:text-4xl">
            Command your exam preparation with an agent that plans, drills, and
            refines every subject.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-emerald-900/80 dark:text-emerald-100/80">
            Upload your constraints, tune mastery sliders, and the assistant
            generates weekly roadmaps, daily rituals, and practice prompts
            covering STEM, humanities, finance, and language sections.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-emerald-900/80 dark:text-emerald-100/80">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-semibold text-emerald-700 shadow-sm dark:bg-emerald-500/20 dark:text-emerald-200">
              {weeksRemaining} weeks of structured execution
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-semibold text-emerald-700 shadow-sm dark:bg-emerald-500/20 dark:text-emerald-200">
              AI-assisted mastery recalibration
            </span>
          </div>
        </div>
        <div className="grid gap-3">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-emerald-200 bg-white/60 p-4 shadow-lg shadow-emerald-200/30 backdrop-blur dark:border-emerald-500/40 dark:bg-emerald-900/20"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-200">
                {item.label}
              </p>
              <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-100/80">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
