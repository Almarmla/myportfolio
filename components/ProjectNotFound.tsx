import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto flex min-h-[70vh] w-full max-w-2xl flex-col items-center justify-center px-6 py-24 text-center outline-none"
    >
      <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
        404
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
        Project not found
      </h1>
      <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
        The project you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
      <Link
        href="/#projects"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
      >
        Back to Projects
      </Link>
    </main>
  );
}
