"use client";

export default function BackToTop() {
  const handleClick = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-sm font-medium text-zinc-600 transition-colors hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
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
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
      Back to top
    </button>
  );
}
