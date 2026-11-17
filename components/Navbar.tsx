"use client";

import { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/data/profile";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("#hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = navLinks
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;

      const headerHeight =
        document.querySelector("header")?.offsetHeight ?? 64;
      const offset = headerHeight + 16;
      let current = sections[0].id;

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= offset) {
          current = section.id;
        }
      }

      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (isAtBottom) {
        current = sections[sections.length - 1].id;
      }

      setActiveSection(`#${current}`);
    };

    const scheduleUpdate = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(updateActiveSection);
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/80 backdrop-blur-md dark:border-zinc-800/70 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <a
          href="#hero"
          className="rounded-full text-lg font-semibold tracking-tight text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600 dark:text-zinc-50"
        >
          {profile.name}
          <span className="text-emerald-700 dark:text-emerald-400">.</span>
        </a>

        <div className="flex items-center gap-2">
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;

                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "location" : undefined}
                      className={`rounded-full px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                        isActive
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <ThemeToggle />

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 md:hidden dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            {isMenuOpen ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="h-5 w-5"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="h-5 w-5"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-zinc-200 bg-white md:hidden dark:border-zinc-800 dark:bg-zinc-950"
        >
          <nav aria-label="Mobile" className="mx-auto max-w-6xl px-6 py-4">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;

                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "location" : undefined}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                        isActive
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
