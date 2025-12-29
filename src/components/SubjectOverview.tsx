"use client";

import { subjects, Subject } from "@/lib/data";

interface SubjectOverviewProps {
  mastery: Record<Subject["id"], number>;
  onUpdateMastery: (subjectId: Subject["id"], value: number) => void;
}

export function SubjectOverview({
  mastery,
  onUpdateMastery,
}: SubjectOverviewProps) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white/60 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
      <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Subject Mastery Control Center
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Adjust mastery estimates to adapt recommendations and study
            intensity.
          </p>
        </div>
      </header>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {subjects.map((subject) => {
          const currentMastery = mastery[subject.id] ?? 40;
          return (
            <article
              key={subject.id}
              className="group flex h-full flex-col justify-between rounded-xl border border-zinc-100 bg-gradient-to-br from-white via-white to-zinc-50 p-5 transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {subject.name}
                  </h3>
                  <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
                    {currentMastery}%
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {subject.summary}
                </p>
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                    Weekly Focus Blueprint
                  </p>
                  <ul className="space-y-1.5 text-sm text-zinc-600 dark:text-zinc-300">
                    {subject.weeklyFocus.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-5">
                <label className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Adjust Mastery
                </label>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={currentMastery}
                  onChange={(event) =>
                    onUpdateMastery(subject.id, Number(event.target.value))
                  }
                  className="mt-2 w-full accent-emerald-500"
                />
                <ul className="mt-4 space-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {subject.examTips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2">
                      <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
