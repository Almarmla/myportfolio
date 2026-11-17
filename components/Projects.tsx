"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

type GitHubRepository = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  url: string;
  stars: number;
  pushedAt: string | null;
};

type ProjectsContent = {
  eyebrow: string;
  heading: string;
  description: string;
  allLabel: string;
  liveLabel: string;
  githubLabel: string;
};

const projectsContent: ProjectsContent[] = [
  {
    eyebrow: "Projects",
    heading: "Selected work",
    description:
      "A selection of projects I have built for local communities and coursework, with a focus on practical, low-bandwidth tools.",
    allLabel: "All",
    liveLabel: "Live Demo",
    githubLabel: "GitHub",
  },
];

function isGitHubRepository(value: unknown): value is GitHubRepository {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const repository = value as Record<string, unknown>;

  return (
    typeof repository.id === "number" &&
    typeof repository.name === "string" &&
    (typeof repository.description === "string" ||
      repository.description === null) &&
    (typeof repository.language === "string" ||
      repository.language === null) &&
    typeof repository.url === "string" &&
    typeof repository.stars === "number" &&
    (typeof repository.pushedAt === "string" ||
      repository.pushedAt === null)
  );
}

export default function Projects() {
  const [content] = projectsContent;
  const [activeCategory, setActiveCategory] = useState(content.allLabel);
  const [githubRepositories, setGitHubRepositories] = useState<
    GitHubRepository[]
  >([]);
  const [githubStatus, setGitHubStatus] = useState<
    "loading" | "ready" | "error"
  >("loading");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let isMounted = true;

    async function loadGitHubRepositories() {
      const response = await fetch("/api/github-projects");

      if (!response.ok) {
        throw new Error(
          `GitHub repositories request failed with status ${response.status}.`,
        );
      }

      const data: unknown = await response.json();

      if (!Array.isArray(data) || !data.every(isGitHubRepository)) {
        throw new Error("GitHub repositories response had an invalid format.");
      }

      if (isMounted) {
        setGitHubRepositories(data);
        setGitHubStatus("ready");
      }
    }

    void loadGitHubRepositories().catch((error: unknown) => {
      if (isMounted) {
        console.error("Unable to load GitHub repositories.", error);
        setGitHubStatus("error");
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = [
    content.allLabel,
    ...Array.from(new Set(projects.map((project) => project.category))),
  ];

  const visibleProjects =
    activeCategory === content.allLabel
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-16 border-t border-zinc-200/70 py-24 sm:py-28 dark:border-zinc-800/70"
    >
      <Reveal className="mx-auto w-full max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            {content.eyebrow}
          </p>
          <h2
            id="projects-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50"
          >
            {content.heading}
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            {content.description}
          </p>
        </div>

        <div
          role="group"
          aria-label="Filter projects by category"
          className="mt-8 flex flex-wrap gap-2"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                  isActive
                    ? "bg-emerald-700 text-white"
                    : "border border-zinc-200 text-zinc-600 hover:border-emerald-600/40 hover:text-emerald-700 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-emerald-400/40 dark:hover:text-emerald-400"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project) => (
            <motion.article
              key={project.id}
              whileHover={shouldReduceMotion ? undefined : { y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white/60 dark:border-zinc-800 dark:bg-zinc-900/40"
            >
              <Link
                href={`/projects/${project.id}`}
                aria-label={`View ${project.title} case study`}
                className="relative block aspect-[16/10] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-zinc-950/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  {project.category}
                </span>
              </Link>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                  <Link
                    href={`/projects/${project.id}`}
                    className="rounded-sm transition-colors hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:hover:text-emerald-400"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-3 pt-6">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                    >
                      {content.liveLabel}
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="inline-flex cursor-not-allowed items-center justify-center rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white opacity-60"
                    >
                      {content.liveLabel}
                    </button>
                  )}
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:border-emerald-600 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
                    >
                      {content.githubLabel}
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="inline-flex cursor-not-allowed items-center justify-center rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-900 opacity-60 dark:border-zinc-700 dark:text-zinc-100"
                    >
                      {content.githubLabel}
                    </button>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 border-t border-zinc-200/70 pt-10 dark:border-zinc-800/70">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                Latest on GitHub
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Public repositories refresh automatically after pushes, usually
                within five minutes.
              </p>
            </div>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              View GitHub profile
            </a>
          </div>

          {githubStatus === "loading" && (
            <p role="status" className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
              Loading public repositories...
            </p>
          )}

          {githubStatus === "error" && (
            <p role="alert" className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
              GitHub repositories could not be loaded right now. Please try
              again later.
            </p>
          )}

          {githubStatus === "ready" && githubRepositories.length === 0 && (
            <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
              No public repositories are available yet.
            </p>
          )}

          {githubStatus === "ready" && githubRepositories.length > 0 && (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {githubRepositories.map((repository) => (
                <motion.article
                  key={repository.id}
                  whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex flex-col rounded-3xl border border-zinc-200 bg-white/60 p-6 dark:border-zinc-800 dark:bg-zinc-900/40"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                      {repository.language ?? "GitHub repository"}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {repository.stars} stars
                    </span>
                  </div>
                  <h4 className="mt-5 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                    {repository.name}
                  </h4>
                  <p className="mt-3 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {repository.description ?? "A public project on GitHub."}
                  </p>
                  <div className="mt-6 flex items-center justify-between gap-3">
                    {repository.pushedAt ? (
                      <time
                        dateTime={repository.pushedAt}
                        className="text-xs text-zinc-500 dark:text-zinc-400"
                      >
                        Updated{" "}
                        {new Date(repository.pushedAt).toLocaleDateString(
                          undefined,
                          { month: "short", year: "numeric" },
                        )}
                      </time>
                    ) : (
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        No pushes yet
                      </span>
                    )}
                    <a
                      href={repository.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${repository.name} on GitHub`}
                      className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:border-emerald-600 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
                    >
                      View repository
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
