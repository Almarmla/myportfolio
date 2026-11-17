"use client";

import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "theme";

type Theme = "light" | "dark";

function getStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme, setTheme: (theme: Theme) => void) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  setTheme(theme);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const storedTheme = getStoredTheme();
    const initialTheme = storedTheme ?? (media.matches ? "dark" : "light");
    applyTheme(initialTheme, setTheme);

    const handleSystemChange = () => {
      if (getStoredTheme()) {
        return;
      }

      applyTheme(getSystemTheme(), setTheme);
    };

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) {
        return;
      }

      applyTheme(
        event.newValue === "light" || event.newValue === "dark"
          ? event.newValue
          : getSystemTheme(),
        setTheme,
      );
    };

    media.addEventListener("change", handleSystemChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      media.removeEventListener("change", handleSystemChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleTheme = () => {
    const currentTheme =
      theme ??
      (document.documentElement.classList.contains("dark") ? "dark" : "light");
    const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(nextTheme, setTheme);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // The theme still updates for the current session if storage is unavailable.
    }
  };

  const label =
    theme === "dark"
      ? "Switch to light mode"
      : theme === "light"
        ? "Switch to dark mode"
        : "Toggle color theme";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:text-zinc-300 dark:hover:bg-zinc-900"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 dark:hidden"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="hidden h-5 w-5 dark:block"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    </button>
  );
}
