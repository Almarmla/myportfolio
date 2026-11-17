import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import SkillLevel from "@/components/SkillLevel";
import { skillGroups, skillsSection } from "@/data/skills";
import type { SkillIcon } from "@/data/skills";

const skillIcons: Record<SkillIcon, ReactNode> = {
  layout: (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M9 9v11" />
    </svg>
  ),
  code: (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 6l-4 12" />
    </svg>
  ),
  react: (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="9" ry="4" />
      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(120 12 12)" />
    </svg>
  ),
  next: (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 16V8l7 8V8" />
    </svg>
  ),
  wind: (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M4 8h10a3 3 0 1 0-3-3M4 12h14a3 3 0 1 1-3 3M4 16h7a2.5 2.5 0 1 1-2.5 2.5" />
    </svg>
  ),
  server: (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </svg>
  ),
  node: (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="M12 8v8M9 10l3 2 3-2" />
    </svg>
  ),
  api: (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M9 3v6M15 3v6M6 9h12v2a6 6 0 0 1-12 0V9ZM12 17v4" />
    </svg>
  ),
  database: (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </svg>
  ),
  git: (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <circle cx="6" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="9" r="2" />
      <path d="M6 8v8M18 11v2a4 4 0 0 1-4 4H8" />
    </svg>
  ),
  editor: (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 5l-2 14" />
    </svg>
  ),
  terminal: (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="m7 9 3 3-3 3M13 15h4" />
    </svg>
  ),
};

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="scroll-mt-16 border-t border-zinc-200/70 py-24 sm:py-28 dark:border-zinc-800/70"
    >
      <Reveal className="mx-auto w-full max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            {skillsSection.eyebrow}
          </p>
          <h2
            id="skills-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50"
          >
            {skillsSection.heading}
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            {skillsSection.description}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {skillGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-3xl border border-zinc-200 bg-white/60 p-6 dark:border-zinc-800 dark:bg-zinc-900/40"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  {group.title}
                </h3>
                <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                  {group.skills.length} skills
                </span>
              </div>

              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="rounded-2xl border border-zinc-200/80 bg-white/70 p-4 dark:border-zinc-800 dark:bg-zinc-950/40"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400">
                        {skillIcons[skill.icon]}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                        {skill.name}
                      </span>
                      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        {skill.level}%
                      </span>
                    </div>
                    <SkillLevel
                      name={skill.name}
                      level={skill.level}
                    />
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
