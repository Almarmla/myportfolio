import Reveal from "@/components/Reveal";
import { achievements, achievementsSection } from "@/data/achievements";

export default function Achievements() {
  return (
    <section
      id="achievements"
      aria-labelledby="achievements-heading"
      className="scroll-mt-16 border-t border-zinc-200/70 py-24 sm:py-28 dark:border-zinc-800/70"
    >
      <Reveal className="mx-auto w-full max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            {achievementsSection.eyebrow}
          </p>
          <h2
            id="achievements-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50"
          >
            {achievementsSection.heading}
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            {achievementsSection.description}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {achievements.map((item) => (
            <article
              key={item.id}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-white/60 p-6 dark:border-zinc-800 dark:bg-zinc-900/40"
            >
              <span
                aria-hidden="true"
                className="block h-1 w-10 rounded-full bg-emerald-500"
              />
              <h3 className="mt-5 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {item.text}
              </p>
              {(item.person || item.role) && (
                <div className="mt-5 border-t border-zinc-200 pt-4 dark:border-zinc-800">
                  {item.person && (
                    <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                      {item.person}
                    </p>
                  )}
                  {item.role && (
                    <p className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      {item.role}
                    </p>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
