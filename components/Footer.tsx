import BackToTop from "@/components/BackToTop";
import SocialIcon from "@/components/SocialIcon";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/social";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200/70 py-8 dark:border-zinc-800/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          &copy; {currentYear} {profile.name}. All rights reserved.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <ul aria-label="Social links" className="flex items-center gap-1">
            {socialLinks.map((link) => {
              const isExternal = link.href.startsWith("http");

              return (
                <li key={`${link.icon}-${link.value}`}>
                  <a
                    href={link.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={`${link.label}: ${link.value}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-emerald-400"
                  >
                    <SocialIcon icon={link.icon} />
                  </a>
                </li>
              );
            })}
          </ul>

          <span
            aria-hidden="true"
            className="h-4 w-px bg-zinc-200 dark:bg-zinc-800"
          />

          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
