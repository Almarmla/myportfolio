import Image from "next/image";
import Reveal from "@/components/Reveal";
import SocialIcon from "@/components/SocialIcon";
import TypingRoles from "@/components/TypingRoles";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/social";
import type { SocialIconName, SocialLink } from "@/data/social";

const stats = [
  { value: "3+", label: "Projects" },
  { value: "Next.js & C#", label: "Tech stack" },
  { value: profile.location, label: "Based in" },
];

const socialOrder: SocialIconName[] = ["github", "linkedin", "email"];

const heroSocialLinks = socialOrder
  .map((icon) => socialLinks.find((link) => link.icon === icon))
  .filter((link): link is SocialLink => link !== undefined);

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[calc(100svh-4rem)] scroll-mt-16 items-center overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <Reveal className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
          <div className="max-w-3xl">
            <span
              aria-hidden="true"
              className="mb-6 block h-1.5 w-16 rounded-full bg-emerald-500"
            />
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              Hello, I&apos;m
            </p>
            <h1
              id="hero-heading"
              className="mt-3 text-5xl font-semibold tracking-tight text-zinc-950 sm:text-7xl lg:text-8xl dark:text-zinc-50"
            >
              {profile.name}
            </h1>
            <p className="mt-4 min-h-8 text-lg font-medium leading-8 text-zinc-950 sm:text-xl dark:text-zinc-50">
              <TypingRoles className="font-semibold text-emerald-700 dark:text-emerald-400" />
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg dark:text-zinc-400">
              {profile.tagline}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                View Projects
              </a>
              <a
                href={profile.cvUrl}
                download
                className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:border-emerald-600 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
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
                  <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
                </svg>
                Download CV
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Connect
              </span>
              <span
                aria-hidden="true"
                className="h-px w-8 bg-zinc-200 dark:bg-zinc-800"
              />
              <ul className="flex items-center gap-2">
                {heroSocialLinks.map((link) => {
                  const isExternal = link.href.startsWith("http");

                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        aria-label={`${link.label}: ${link.value}`}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition-colors hover:border-emerald-600/40 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-emerald-400/40 dark:hover:text-emerald-400"
                      >
                        <SocialIcon icon={link.icon} className="h-4 w-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center gap-10">
            <div className="relative">
              <div className="relative h-60 w-60 overflow-hidden rounded-full bg-white p-2 shadow-xl ring-1 ring-emerald-500/20 sm:h-72 sm:w-72 dark:bg-zinc-900">
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  <Image
                    src={profile.photo}
                    alt="Almar, IT student and software developer"
                    fill
                    priority
                    sizes="(min-width: 640px) 288px, 240px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
              <span className="absolute -bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-emerald-500/30 bg-white px-4 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm dark:bg-zinc-900 dark:text-emerald-400">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 motion-reduce:animate-none"
                />
                Available for projects
              </span>
            </div>

            <dl className="grid w-full max-w-sm grid-cols-3 gap-4 text-center">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    {stat.label}
                  </dt>
                  <dd className="text-sm font-semibold text-zinc-950 sm:text-base dark:text-zinc-50">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-14 flex justify-center lg:mt-16">
          <a
            href="#about"
            aria-label="Scroll to about section"
            className="group inline-flex flex-col items-center gap-2 rounded-full p-2 text-zinc-500 transition-colors hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
          >
            <span className="text-xs font-semibold uppercase tracking-widest">
              Scroll
            </span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 animate-bounce motion-reduce:animate-none"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
