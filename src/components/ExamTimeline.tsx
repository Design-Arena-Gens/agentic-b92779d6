"use client";

import { useMemo } from "react";

interface ExamTimelineProps {
  weeks: number;
}

const milestoneTemplates = [
  {
    phase: "Foundational Lift-Off",
    range: "Weeks 1-2",
    directives: [
      "Perform diagnostic tests across every subject to benchmark mastery.",
      "Set up knowledge base: formula sheets, concept maps, summarised notes.",
      "Lock core routines—morning review, mid-day drills, evening synthesis.",
    ],
  },
  {
    phase: "Acceleration Sprint",
    range: "Weeks 3-5",
    directives: [
      "Alternate between concept-focused mornings and mock-driven evenings.",
      "Integrate interleaving—mix subjects in each study block to avoid fatigue.",
      "Maintain weekly retrospective with quantifiable KPIs: accuracy, speed, depth.",
    ],
  },
  {
    phase: "Simulation & Recovery",
    range: "Weeks 6-8",
    directives: [
      "Run full-length mocks bi-weekly; conduct post-mortems within 12 hours.",
      "Shift focus to high-yield short notes and flashcards.",
      "Practise stress-management drills: breathing, visualization, positive reframing.",
    ],
  },
  {
    phase: "Precision Taper",
    range: "Final Week",
    directives: [
      "Protect sleep, hydrate, and limit new content. Focus on calm execution.",
      "Do lightweight mixed quizzing to keep momentum without burnout.",
      "Prepare exam-day kit: documents, logistics, food, timed arrival plan.",
    ],
  },
];

export function ExamTimeline({ weeks }: ExamTimelineProps) {
  const tailoredMilestones = useMemo(() => {
    if (weeks <= 4) {
      return milestoneTemplates.slice(2);
    }
    if (weeks <= 8) {
      return milestoneTemplates;
    }
    const additionalPhase = {
      phase: "Extended Mastery Cycle",
      range: `Weeks 1-${weeks - 7}`,
      directives: [
        "Segment the syllabus into monthly arcs; focus on depth-first mastery.",
        "Layer in peer discussion groups or mentorship for feedback loops.",
        "Conduct monthly super-mock days covering all subjects sequentially.",
      ],
    };
    return [additionalPhase, ...milestoneTemplates];
  }, [weeks]);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
      <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Macro Timeline Navigator
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Track preparation phases from foundational lifting to exam-week
            tapering. Each milestone carries execution directives.
          </p>
        </div>
      </header>
      <div className="space-y-4">
        {tailoredMilestones.map((milestone, index) => (
          <article
            key={milestone.phase}
            className="rounded-2xl border border-zinc-100 bg-gradient-to-br from-white via-white to-zinc-50 p-5 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
                  Phase {index + 1}
                </p>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {milestone.phase}
                </h3>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
                {milestone.range}
              </span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
              {milestone.directives.map((directive) => (
                <li key={directive} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>{directive}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
