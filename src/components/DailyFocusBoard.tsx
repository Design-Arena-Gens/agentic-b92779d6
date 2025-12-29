"use client";

import { useMemo } from "react";
import { subjects, SubjectKey } from "@/lib/data";

interface DailyFocusBoardProps {
  mastery: Record<SubjectKey, number>;
}

const morningBoosters = [
  "10-minute formula or definition rapid-fire recall",
  "3 Pomodoro warm-up with low stakes problem-solving",
  "Mindfulness breathing for 4 minutes to prime focus",
  "Quick status log: yesterday’s win, today’s constraint, immediate priority",
];

const middayMomentum = [
  "Attempt a sectional test under half time to build pacing stamina",
  "Teach a concept aloud or to a study buddy to reinforce retention",
  "Rewrite incorrect answers as mini case-studies to avoid repeat errors",
];

const eveningWrap = [
  "Reflect on top 3 insights & log them into knowledge base",
  "Plan tomorrow’s first study block in detail",
  "Light-weight review: flashcards, diagrams, or summary maps",
];

export function DailyFocusBoard({ mastery }: DailyFocusBoardProps) {
  const prioritizedSubjects = useMemo(() => {
    return [...subjects]
      .map((subject) => ({
        ...subject,
        mastery: mastery[subject.id] ?? 50,
      }))
      .sort((a, b) => a.mastery - b.mastery)
      .slice(0, 3);
  }, [mastery]);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Daily Focus Command Board
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Leverage morning, midday, and evening rituals. Weakest subjects are
            highlighted for extra attention.
          </p>
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <div className="rounded-xl border border-zinc-200 bg-gradient-to-br from-white via-white to-zinc-50 p-4 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Morning Launchpad
            </p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
              {morningBoosters.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-gradient-to-br from-white via-white to-zinc-50 p-4 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Midday Momentum
            </p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
              {middayMomentum.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-gradient-to-br from-white via-white to-zinc-50 p-4 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Evening Closure
            </p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
              {eveningWrap.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-emerald-600 p-5 text-white shadow-lg shadow-emerald-500/30 dark:border-emerald-500/40 dark:bg-emerald-500">
          <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
            SOS Subjects – Priority Queue
          </p>
          <ul className="mt-4 space-y-4">
            {prioritizedSubjects.map((subject, index) => (
              <li key={subject.id} className="rounded-xl bg-white/10 p-4">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>
                    {index + 1}. {subject.name}
                  </span>
                  <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs">
                    {subject.mastery}% mastery
                  </span>
                </div>
                <ul className="mt-3 space-y-1 text-xs text-white/80">
                  {subject.weeklyFocus.slice(0, 2).map((focus) => (
                    <li key={focus} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-white" />
                      <span>{focus}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-white/70">
            Tip: Schedule these subjects in your first study block when energy
            is highest. Reassess mastery weekly to ensure rotation.
          </p>
        </div>
      </div>
    </section>
  );
}
