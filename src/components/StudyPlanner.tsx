"use client";

import { useEffect, useMemo, useState } from "react";
import { subjects, SubjectKey } from "@/lib/data";

interface StudyPlannerProps {
  mastery: Record<SubjectKey, number>;
  onWeeksChange?: (weeks: number) => void;
}

interface PlanConfig {
  examName: string;
  examDate: string;
  dailyHours: number;
  intensity: "steady" | "aggressive" | "revision";
  includeMockTests: boolean;
  focusSubjects: SubjectKey[];
}

interface WeeklyPlan {
  weekIndex: number;
  startDate: Date;
  endDate: Date;
  focusAreas: {
    subject: SubjectKey;
    hours: number;
    priority: "concept-building" | "drill" | "revision" | "mixed";
    outcomes: string[];
  }[];
  accountability: string;
}

const intensityMultiplier: Record<PlanConfig["intensity"], number> = {
  steady: 1,
  aggressive: 1.35,
  revision: 0.85,
};

function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}

const accountabilityTips = [
  "Run a Sunday evening retrospective: highlight successes, document blockers, tweak next week accordingly.",
  "Share your weekly targets with a peer accountability partner; exchange progress updates every Friday.",
  "Use a daily 5-minute voice note to reflect on what accelerated or slowed you.",
  "Attach a reward to delivering 90% completion—for example, a leisure block or digital detox session.",
  "Log accuracy after every mock test and compute rolling averages to track readiness.",
];

const outcomesLibrary: Record<
  SubjectKey,
  { concept: string; drill: string; revision: string }
> = {
  mathematics: {
    concept: "Revise core formulae & attempt 10 novel problems on high-leverage topics.",
    drill: "Time-box mixed sectionals with negative marking simulation.",
    revision: "Re-attempt incorrect questions & build error flashcards.",
  },
  physics: {
    concept: "Rebuild derivations from first principles and annotate assumptions.",
    drill: "Solve 15 numericals focusing on units and dimensional checks.",
    revision: "Summarize three experiment setups and important graphs.",
  },
  chemistry: {
    concept: "Craft mechanism maps for new reactions encountered this week.",
    drill: "Run 30-minute speed quizzes alternating inorganic & physical sections.",
    revision: "Revisit summary sheets highlighting exceptions and color changes.",
  },
  biology: {
    concept: "Sketch flow diagrams for physiological processes and label keywords.",
    drill: "Attempt 40 assertion–reason MCQs targeting weak chapters.",
    revision: "Narrate processes aloud and cross-check with primary notes.",
  },
  history: {
    concept: "Build layered timelines weaving political, social, and economic triggers.",
    drill: "Write two 200-word essays with focus on thesis clarity and evidence.",
    revision: "Review and memorize cause-impact tables using spaced recall.",
  },
  economics: {
    concept: "Re-derive demand/supply results and annotate policy implications.",
    drill: "Solve four numerical case studies with graphs drawn from scratch.",
    revision: "Summarize news articles and map them to syllabus themes.",
  },
  computerScience: {
    concept: "Implement algorithms without IDE assist and annotate invariants.",
    drill: "Complete 3 timed coding problems with post-mortem analysis.",
    revision: "Convert solved problems into template notes with pitfalls.",
  },
  english: {
    concept: "Curate vocabulary sets and embed them into contextual sentences.",
    drill: "Attempt RC drills with 65% of time allocated to analysis.",
    revision: "Polish essay intros & conclusions; memorize grammar error log.",
  },
};

const priorityResolver = (score: number): WeeklyPlan["focusAreas"][number]["priority"] => {
  if (score < 40) return "concept-building";
  if (score < 65) return "drill";
  if (score < 80) return "mixed";
  return "revision";
};

export function StudyPlanner({ mastery, onWeeksChange }: StudyPlannerProps) {
  const [config, setConfig] = useState<PlanConfig>({
    examName: "Unified Competitive Exam",
    examDate: "",
    dailyHours: 5,
    intensity: "steady",
    includeMockTests: true,
    focusSubjects: subjects.map((subject) => subject.id),
  });

  const [today] = useState(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  });

  const weeksUntilExam = useMemo(() => {
    if (!config.examDate) return 6;
    const target = new Date(config.examDate);
    target.setHours(0, 0, 0, 0);
    const diff = target.getTime() - today.getTime();
    const weeks = Math.ceil(diff / (7 * 24 * 60 * 60 * 1000));
    return clamp(weeks, 4, 26);
  }, [config.examDate, today]);

  const selectedSubjects = useMemo(() => {
    return subjects.filter((subject) =>
      config.focusSubjects.includes(subject.id),
    );
  }, [config.focusSubjects]);

  const weeklyPlans: WeeklyPlan[] = useMemo(() => {
    if (selectedSubjects.length === 0) return [];
    const totalWeight = selectedSubjects.reduce((acc, subject) => {
      const masteryGap = 100 - (mastery[subject.id] ?? 50);
      return acc + masteryGap;
    }, 0);
    const weeklyHours =
      config.dailyHours * 7 * intensityMultiplier[config.intensity];

    return Array.from({ length: weeksUntilExam }, (_, index) => {
      const start = new Date(today);
      start.setDate(start.getDate() + index * 7);
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      const focusAreas = selectedSubjects.map((subject) => {
        const masteryGap = 100 - (mastery[subject.id] ?? 50);
        const subjectRatio = totalWeight > 0 ? masteryGap / totalWeight : 1;
        const rawHours = subjectRatio * weeklyHours;
        const roundedHours = Math.round(rawHours * 2) / 2;
        const priority = priorityResolver(mastery[subject.id] ?? 50);
        const outcomesTemplates = outcomesLibrary[subject.id];
        const outcomes =
          priority === "concept-building"
            ? [outcomesTemplates.concept, outcomesTemplates.drill]
            : priority === "drill"
              ? [outcomesTemplates.drill, outcomesTemplates.concept]
              : priority === "revision"
                ? [outcomesTemplates.revision, outcomesTemplates.drill]
                : [
                    outcomesTemplates.concept,
                    outcomesTemplates.drill,
                    outcomesTemplates.revision,
                  ];

        return {
          subject: subject.id,
          hours: clamp(roundedHours, 3, weeklyHours),
          priority,
          outcomes,
        };
      });

      return {
        weekIndex: index,
        startDate: start,
        endDate: end,
        focusAreas,
        accountability:
          accountabilityTips[index % accountabilityTips.length],
      };
    });
  }, [
    weeksUntilExam,
    selectedSubjects,
    mastery,
    config.dailyHours,
    config.intensity,
    today,
  ]);

  useEffect(() => {
    onWeeksChange?.(weeksUntilExam);
  }, [onWeeksChange, weeksUntilExam]);

  const weeklyMockTargets = useMemo(() => {
    if (!config.includeMockTests) return [];
    const segments = Math.max(1, Math.floor(weeksUntilExam / 4));
    return Array.from({ length: weeksUntilExam }, (_, index) => {
      const weekNumber = index + 1;
      const phase = Math.ceil(weekNumber / segments);
      const label =
        phase === 1
          ? "Topic-wise sectional test"
          : phase === 2
            ? "Half-length simulation"
            : "Full-length mock with review sprint";
      return { week: weekNumber, label };
    });
  }, [config.includeMockTests, weeksUntilExam]);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
      <div className="flex flex-col gap-3 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Intelligent Study Planner
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Generate a mastery-weighted roadmap. Adjust variables; the plan
          responds instantly with balanced weekly targets.
        </p>
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1.1fr_1.2fr] xl:grid-cols-[1fr_1.3fr]">
        <form className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="exam-name"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Exam Blueprint
            </label>
            <input
              id="exam-name"
              type="text"
              value={config.examName}
              onChange={(event) =>
                setConfig((prev) => ({ ...prev, examName: event.target.value }))
              }
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-emerald-400"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="exam-date"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Exam Date
              </label>
              <input
                id="exam-date"
                type="date"
                value={config.examDate}
                onChange={(event) =>
                  setConfig((prev) => ({
                    ...prev,
                    examDate: event.target.value,
                  }))
                }
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="daily-hours"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Daily Focus Hours
              </label>
              <input
                id="daily-hours"
                type="number"
                min={2}
                max={12}
                step={0.5}
                value={config.dailyHours}
                onChange={(event) =>
                  setConfig((prev) => ({
                    ...prev,
                    dailyHours: Number(event.target.value) || 0,
                  }))
                }
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Intensity Preset
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              {(
                [
                  { id: "steady", label: "Steady Momentum" },
                  { id: "aggressive", label: "Aggressive Push" },
                  { id: "revision", label: "Revision Taper" },
                ] as const
              ).map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() =>
                    setConfig((prev) => ({ ...prev, intensity: option.id }))
                  }
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    config.intensity === option.id
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm dark:border-emerald-400 dark:bg-emerald-500/20 dark:text-emerald-300"
                      : "border-zinc-200 bg-white text-zinc-600 hover:border-emerald-300 hover:text-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Subject Focus
            </p>
            <div className="flex flex-wrap gap-2">
              {subjects.map((subject) => {
                const isSelected = config.focusSubjects.includes(subject.id);
                return (
                  <button
                    key={subject.id}
                    type="button"
                    onClick={() =>
                      setConfig((prev) => ({
                        ...prev,
                        focusSubjects: isSelected
                          ? prev.focusSubjects.filter(
                              (item) => item !== subject.id,
                            )
                          : [...prev.focusSubjects, subject.id],
                      }))
                    }
                    className={`rounded-full border px-4 py-1 text-sm font-medium transition ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm dark:border-emerald-400 dark:bg-emerald-500/20 dark:text-emerald-200"
                        : "border-zinc-200 bg-white text-zinc-600 hover:border-emerald-300 hover:text-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                    }`}
                  >
                    {subject.name}
                  </button>
                );
              })}
            </div>
          </div>

          <label className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50/60 p-3 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={config.includeMockTests}
              onChange={(event) =>
                setConfig((prev) => ({
                  ...prev,
                  includeMockTests: event.target.checked,
                }))
              }
              className="h-4 w-4 accent-emerald-500"
            />
            Include mock test cadence in weekly plan
          </label>

          <div className="rounded-lg border border-emerald-200 bg-emerald-50/80 p-4 text-sm text-emerald-700 dark:border-emerald-400/60 dark:bg-emerald-500/15 dark:text-emerald-200">
            {config.examDate ? (
              <p>
                You have{" "}
                <span className="font-semibold">{weeksUntilExam} weeks</span> to
                master <span className="font-semibold">{selectedSubjects.length}</span>{" "}
                subjects averaging{" "}
                <span className="font-semibold">
                  {(config.dailyHours * intensityMultiplier[config.intensity]).toFixed(1)}
                </span>{" "}
                focused hours daily.
              </p>
            ) : (
              <p>
                Set your exam date to calibrate the timeline. Defaults to a
                structured 6-week runway if the date is left blank.
              </p>
            )}
          </div>
        </form>

        <div className="space-y-5">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {config.examName} – Weekly Trajectory
            </h3>
            <div className="mt-4 space-y-5">
              {weeklyPlans.map((plan) => (
                <div
                  key={plan.weekIndex}
                  className="rounded-lg border border-zinc-200 bg-white/80 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/70"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                      Week {plan.weekIndex + 1} · {formatDate(plan.startDate)} →{" "}
                      {formatDate(plan.endDate)}
                    </p>
                    <span className="text-xs font-medium uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
                      {plan.focusAreas.length} focus tracks
                    </span>
                  </div>
                  <div className="mt-3 grid gap-4 md:grid-cols-2">
                    {plan.focusAreas.map((area) => {
                      const subjectMeta = subjects.find(
                        (subject) => subject.id === area.subject,
                      );
                      if (!subjectMeta) return null;
                      return (
                        <div
                          key={area.subject}
                          className="rounded-lg border border-zinc-100 bg-zinc-50/80 p-3 dark:border-zinc-800 dark:bg-zinc-900/60"
                        >
                          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                            {subjectMeta.name} · {area.hours} hrs ·{" "}
                            <span className="capitalize text-emerald-600 dark:text-emerald-300">
                              {area.priority.replace("-", " ")}
                            </span>
                          </p>
                          <ul className="mt-2 space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                            {area.outcomes.map((outcome) => (
                              <li key={outcome} className="flex items-start gap-2">
                                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                <span>{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                  <p className="mt-4 rounded-md border border-dashed border-emerald-300 bg-emerald-50/60 p-2 text-xs text-emerald-700 dark:border-emerald-400/40 dark:bg-emerald-500/10 dark:text-emerald-200">
                    Accountability ritual: {plan.accountability}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {weeklyMockTargets.length > 0 && (
            <div className="rounded-xl border border-zinc-200 bg-white/70 p-5 dark:border-zinc-800 dark:bg-zinc-900/70">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                Mock Test Cadence
              </h3>
              <ul className="mt-3 space-y-2.5 text-sm text-zinc-600 dark:text-zinc-300">
                {weeklyMockTargets.map((item) => (
                  <li
                    key={item.week}
                    className="flex items-start gap-3 rounded-lg border border-zinc-100 bg-zinc-50/80 p-3 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-950/60"
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-semibold text-white">
                      {item.week}
                    </span>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
