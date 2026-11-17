import Reveal from "@/components/Reveal";
import { experienceGroups, experienceSection } from "@/data/experience";

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-16 border-t border-zinc-200/70 py-24 sm:py-28 dark:border-zinc-800/70"
    >
      <Reveal className="mx-auto w-full max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            {experienceSection.eyebrow}
          </p>
          <h2
            id="experience-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50"
          >
            {experienceSection.heading}
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            {experienceSection.description}
          </p>
        </div>

        <ol className="relative mt-12 max-w-3xl space-y-12 border-l border-zinc-200 dark:border-zinc-800">
          {experienceGroups.map((group) => (
            <li key={group.id} className="relative pl-8">
              <span
                aria-hidden="true"
                className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 dark:border-zinc-950"
              />
              <h3 className="text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                {group.label}
              </h3>

              <div className="mt-5 space-y-4">
                {group.entries.map((entry) => (
                  <article
                    key={entry.id}
                    className="rounded-2xl border border-zinc-200 bg-white/60 p-6 dark:border-zinc-800 dark:bg-zinc-900/40"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h4 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                          {entry.title}
                        </h4>
                        <p className="mt-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                          {entry.institution}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                        {entry.period}
                      </p>
                    </div>

                    <ul className="mt-4 space-y-2">
                      {entry.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex gap-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
