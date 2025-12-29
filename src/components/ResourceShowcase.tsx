"use client";

import { resources, subjects } from "@/lib/data";

const typeLabels: Record<
  (typeof resources)[number]["type"],
  { label: string; icon: string }
> = {
  video: { label: "Video Series", icon: "🎬" },
  article: { label: "Article / Notes", icon: "🗒️" },
  book: { label: "Book Companion", icon: "📘" },
  problem_set: { label: "Problem Sets", icon: "🧠" },
  tool: { label: "Tools & Apps", icon: "🛠️" },
};

export function ResourceShowcase() {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
      <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Resource Intelligence Hub
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Curated assets across subjects—mix doctrinal mastery with high-yield
            revision and simulation.
          </p>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        {resources.map((resource) => {
          const subjectName =
            resource.subject === "general"
              ? "All Subjects"
              : subjects.find((subject) => subject.id === resource.subject)?.name ??
                "General";
          return (
            <article
              key={resource.id}
              className="group flex h-full flex-col justify-between rounded-xl border border-zinc-100 bg-gradient-to-br from-white via-white to-zinc-50 p-5 transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  <span>{subjectName}</span>
                  <span className="flex items-center gap-1 rounded-full bg-zinc-900/90 px-3 py-1 text-[10px] font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
                    {typeLabels[resource.type].icon}{" "}
                    {typeLabels[resource.type].label}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {resource.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {resource.description}
                </p>
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex flex-wrap gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  {resource.skillTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-zinc-200 px-3 py-1 transition group-hover:border-emerald-400 group-hover:text-emerald-600 dark:border-zinc-700 dark:group-hover:border-emerald-300 dark:group-hover:text-emerald-200"
                    >
                      #{tag}
                    </span>
                  ))}
                  {resource.duration && (
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700 dark:border-emerald-400/40 dark:bg-emerald-500/10 dark:text-emerald-200">
                      {resource.duration}
                    </span>
                  )}
                </div>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-500 dark:text-emerald-300 dark:hover:text-emerald-200"
                >
                  Launch resource
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
