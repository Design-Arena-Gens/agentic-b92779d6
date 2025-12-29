"use client";

import { useMemo, useState } from "react";
import { subjects, SubjectKey } from "@/lib/data";
import { Hero } from "@/components/Hero";
import { StudyPlanner } from "@/components/StudyPlanner";
import { SubjectOverview } from "@/components/SubjectOverview";
import { PracticeGenerator } from "@/components/PracticeGenerator";
import { DailyFocusBoard } from "@/components/DailyFocusBoard";
import { ResourceShowcase } from "@/components/ResourceShowcase";
import { ExamTimeline } from "@/components/ExamTimeline";

const initialMastery: Record<SubjectKey, number> = Object.fromEntries(
  subjects.map((subject) => [subject.id, 55]),
) as Record<SubjectKey, number>;

export default function Home() {
  const [mastery, setMastery] =
    useState<Record<SubjectKey, number>>(initialMastery);
  const [weeksRemaining, setWeeksRemaining] = useState(12);

  const avgMastery = useMemo(() => {
    const values = Object.values(mastery);
    const total = values.reduce((acc, value) => acc + value, 0);
    return Math.round(total / values.length);
  }, [mastery]);

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 p-6 pb-12 md:p-10">
      <Hero weeksRemaining={weeksRemaining} />

      <section className="grid gap-6 rounded-3xl border border-zinc-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70 lg:grid-cols-[1fr_0.9fr]">
        <div className="flex flex-col justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
              Readiness Snapshot
            </p>
            <h2 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Adaptive mastery overview
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Tune mastery sliders per subject; the planner and practice engine
              respond instantly to close your gaps.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 text-emerald-800 shadow-inner dark:border-emerald-400/50 dark:bg-emerald-500/15 dark:text-emerald-200">
              <p className="text-xs font-semibold uppercase tracking-wide">
                Average Mastery
              </p>
              <p className="mt-2 text-4xl font-bold">{avgMastery}%</p>
              <p className="mt-2 text-sm">
                Improve by focusing on the bottom-three subjects highlighted in
                the daily board.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white/70 p-5 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Weekly Runway
              </p>
              <p className="mt-2 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
                {weeksRemaining}
              </p>
              <p className="mt-2 text-sm">
                Update the exam date in the planner to recalibrate this runway.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-zinc-100 bg-white/80 p-5 shadow-inner dark:border-zinc-800 dark:bg-zinc-950/70">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
            Execution Mantra
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            Stay consistent with daily rituals, run weekly retrospectives, and
            progressively overload your practice. This agent aligns all subjects
            so that quant, verbal, analytical, and writing tracks advance in
            synchrony.
          </p>
          <div className="mt-4 grid gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span>• Monday to Thursday → Concept depth + Drill rotations</span>
            <span>• Friday → Mock or sectional under timed constraints</span>
            <span>• Weekend → Review, knowledge consolidation, active recall</span>
          </div>
        </div>
      </section>

      <SubjectOverview
        mastery={mastery}
        onUpdateMastery={(subjectId, value) =>
          setMastery((prev) => ({ ...prev, [subjectId]: value }))
        }
      />

      <StudyPlanner
        mastery={mastery}
        onWeeksChange={(value) => setWeeksRemaining(value)}
      />

      <DailyFocusBoard mastery={mastery} />

      <PracticeGenerator mastery={mastery} />

      <ExamTimeline weeks={weeksRemaining} />

      <ResourceShowcase />
    </main>
  );
}
