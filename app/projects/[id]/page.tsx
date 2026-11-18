import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { siteOgImage } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.id}`,
    },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.description,
      url: `/projects/${project.id}`,
      images: [siteOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [siteOgImage],
    },
  };
}

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto w-full max-w-5xl px-6 py-16 outline-none sm:py-20"
    >
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Projects
      </Link>

      <header className="mt-8">
        <span className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
          {project.category}
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {project.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Live Demo
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex cursor-not-allowed items-center justify-center rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white opacity-60"
            >
              Live Demo
            </button>
          )}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:border-emerald-600 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
            >
              GitHub
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex cursor-not-allowed items-center justify-center rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-900 opacity-60 dark:border-zinc-700 dark:text-zinc-100"
            >
              GitHub
            </button>
          )}
        </div>
      </header>

      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          unoptimized
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_18rem]">
        <div className="space-y-10">
          <section aria-labelledby="problem-heading">
            <h2
              id="problem-heading"
              className="text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400"
            >
              Problem
            </h2>
            <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
              {project.problemSolved}
            </p>
          </section>

          <section aria-labelledby="solution-heading">
            <h2
              id="solution-heading"
              className="text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400"
            >
              Solution
            </h2>
            <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
              {project.solution}
            </p>
          </section>

          <section aria-labelledby="features-heading">
            <h2
              id="features-heading"
              className="text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400"
            >
              Features
            </h2>
            <ul className="mt-3 space-y-2">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-2 text-base leading-7 text-zinc-600 dark:text-zinc-400"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="screenshots-heading">
            <h2
              id="screenshots-heading"
              className="text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400"
            >
              Screenshots
            </h2>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {project.screenshots.map((screenshot, index) => (
                <div
                  key={`${screenshot}-${index}`}
                  className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800"
                >
                  <Image
                    src={screenshot}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    unoptimized
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="learned-heading">
            <h2
              id="learned-heading"
              className="text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400"
            >
              What I learned
            </h2>
            <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
              {project.learned}
            </p>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-2xl border border-zinc-200 bg-white/60 p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Tech stack
            </h2>
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
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white/60 p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Links
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                  Live Demo
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex cursor-not-allowed items-center justify-center rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white opacity-60"
                >
                  Live Demo
                </button>
              )}
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:border-emerald-600 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
                >
                  GitHub
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex cursor-not-allowed items-center justify-center rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-900 opacity-60 dark:border-zinc-700 dark:text-zinc-100"
                >
                  GitHub
                </button>
              )}
              <Link
                href="/#projects"
                className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-zinc-600 transition-colors hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
              >
                Back to Projects
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
