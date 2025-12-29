"use client";

import { useMemo, useState } from "react";
import {
  questionBank,
  PracticeQuestion,
  subjects,
  SubjectKey,
} from "@/lib/data";

type Difficulty = PracticeQuestion["difficulty"] | "mixed";

interface PracticeGeneratorProps {
  mastery: Record<SubjectKey, number>;
}

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

const difficultyLabels: Record<Difficulty, string> = {
  foundation: "Foundation",
  intermediate: "Intermediate",
  advanced: "Advanced",
  mixed: "Smart Mix",
};

export function PracticeGenerator({ mastery }: PracticeGeneratorProps) {
  const [subjectFilter, setSubjectFilter] = useState<SubjectKey | "all">("all");
  const [difficulty, setDifficulty] = useState<Difficulty>("mixed");
  const [activeQuestion, setActiveQuestion] = useState<PracticeQuestion | null>(
    null,
  );
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewTags, setReviewTags] = useState<string[]>([]);

  const filteredQuestions = useMemo(() => {
    let pool = questionBank;
    if (subjectFilter !== "all") {
      pool = pool.filter((item) => item.subject === subjectFilter);
    }
    if (difficulty !== "mixed") {
      pool = pool.filter((item) => item.difficulty === difficulty);
    } else if (subjectFilter !== "all") {
      const subjectMastery = mastery[subjectFilter] ?? 60;
      const bias =
        subjectMastery < 45
          ? "foundation"
          : subjectMastery > 80
            ? "advanced"
            : "intermediate";
      pool = pool.filter((item) =>
        bias === "intermediate"
          ? ["foundation", "intermediate"].includes(item.difficulty)
          : item.difficulty === bias,
      );
    }
    return pool;
  }, [subjectFilter, difficulty, mastery]);

  const generateQuestion = () => {
    if (filteredQuestions.length === 0) {
      setActiveQuestion(null);
      return;
    }
    const selection = pickRandom(filteredQuestions);
    setActiveQuestion(selection);
    setShowAnswer(false);
    setReviewTags([]);
  };

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
      <header className="flex flex-col gap-3 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Adaptive Practice Arena
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Generate targeted prompts aligned with your subject mastery.
            Reflect, tag your confusion, and export review notes.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="rounded-full bg-zinc-100 px-3 py-1 dark:bg-zinc-800">
            Questions available: {filteredQuestions.length}
          </span>
          <span className="rounded-full bg-zinc-100 px-3 py-1 dark:bg-zinc-800">
            Autotuned difficulty: {difficultyLabels[difficulty]}
          </span>
        </div>
      </header>

      <div className="mt-5 flex flex-col gap-5 lg:flex-row">
        <div className="basis-2/5 space-y-5">
          <div className="rounded-xl border border-zinc-200 bg-white/90 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Subject Lane
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSubjectFilter("all")}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  subjectFilter === "all"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm dark:border-emerald-400 dark:bg-emerald-500/20 dark:text-emerald-200"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-emerald-300 hover:text-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                }`}
              >
                All Subjects
              </button>
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  type="button"
                  onClick={() => setSubjectFilter(subject.id)}
                  className={`rounded-lg border px-3 py-2 text-sm transition ${
                    subjectFilter === subject.id
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm dark:border-emerald-400 dark:bg-emerald-500/20 dark:text-emerald-200"
                      : "border-zinc-200 bg-white text-zinc-600 hover:border-emerald-300 hover:text-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                  }`}
                >
                  {subject.name}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white/90 p-4 dark:border-zinc-800 dark:bg-zinc-950/70">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Difficulty Vector
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(Object.keys(difficultyLabels) as Difficulty[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setDifficulty(key)}
                  className={`rounded-lg border px-3 py-2 text-sm transition ${
                    difficulty === key
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm dark:border-emerald-400 dark:bg-emerald-500/20 dark:text-emerald-200"
                      : "border-zinc-200 bg-white text-zinc-600 hover:border-emerald-300 hover:text-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                  }`}
                >
                  {difficultyLabels[key]}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
              Mixed mode auto-adjusts difficulty based on your mastery score.
              Use advanced mode for stress-testing peak performance.
            </p>
          </div>

          <button
            type="button"
            onClick={generateQuestion}
            className="flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400"
          >
            Generate Challenge
          </button>
        </div>

        <div className="grow">
          <div className="h-full rounded-2xl border border-zinc-200 bg-gradient-to-br from-white via-white to-zinc-50 p-5 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
            {activeQuestion ? (
              <div className="flex h-full flex-col">
                <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  <span className="rounded-full bg-zinc-100 px-3 py-1 dark:bg-zinc-800">
                    {subjects.find((item) => item.id === activeQuestion.subject)
                      ?.name ?? "Unknown"}
                  </span>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 dark:bg-zinc-800">
                    {difficultyLabels[activeQuestion.difficulty]}
                  </span>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 dark:bg-zinc-800">
                    Concepts: {activeQuestion.concepts.join(", ")}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  Prompt
                </h3>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {activeQuestion.prompt}
                </p>

                <div className="mt-6 flex flex-wrap gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  {["Need revision", "Formula gap", "Concept unclear", "Silly mistake"].map(
                    (tag) => {
                      const active = reviewTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() =>
                            setReviewTags((prev) =>
                              prev.includes(tag)
                                ? prev.filter((item) => item !== tag)
                                : [...prev, tag],
                            )
                          }
                          className={`rounded-full border px-3 py-1 transition ${
                            active
                              ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-400 dark:bg-emerald-500/20 dark:text-emerald-200"
                              : "border-zinc-200 bg-white text-zinc-600 hover:border-emerald-300 hover:text-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    },
                  )}
                </div>

                <div className="mt-6 rounded-xl border border-dashed border-zinc-300 bg-white/70 p-4 dark:border-zinc-700 dark:bg-zinc-900/60">
                  <button
                    type="button"
                    onClick={() => setShowAnswer((prev) => !prev)}
                    className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-500 dark:text-emerald-300 dark:hover:text-emerald-200"
                  >
                    {showAnswer ? "Hide solution" : "Reveal crafted solution"}
                  </button>
                  {showAnswer && (
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {activeQuestion.answer}
                    </p>
                  )}
                </div>

                {reviewTags.length > 0 && (
                  <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs text-emerald-700 dark:border-emerald-400/40 dark:bg-emerald-500/10 dark:text-emerald-200">
                    <p className="font-semibold">Review log</p>
                    <p className="mt-1">
                      Tags: <span className="font-medium">{reviewTags.join(" · ")}</span>.
                      Add this prompt to your error journal and revisit within 72 hours
                      for spaced reinforcement.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                <p className="text-lg font-semibold text-zinc-700 dark:text-zinc-200">
                  Ready to launch a new challenge?
                </p>
                <p className="max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
                  Filter subjects, tune the difficulty, and hit “Generate
                  Challenge” to receive a handcrafted question with solution
                  strategies.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
