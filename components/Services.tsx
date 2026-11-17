"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import {
  SERVICE_SELECT_EVENT,
  services,
  servicesSection,
} from "@/data/services";
import type { ServiceIcon } from "@/data/services";

const serviceIcons: Record<ServiceIcon, ReactNode> = {
  document: (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </svg>
  ),
  sparkles: (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z" />
      <path d="m19 15 .75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75L19 15ZM5 3l.5 1.5L7 5l-1.5.5L5 7l-.5-1.5L3 5l1.5-.5L5 3Z" />
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
      className="h-6 w-6"
    >
      <path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />
    </svg>
  ),
};

export default function Services() {
  const handleSelectService = (service: string) => {
    window.dispatchEvent(
      new CustomEvent(SERVICE_SELECT_EVENT, { detail: service }),
    );
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-16 border-t border-zinc-200/70 py-24 sm:py-28 dark:border-zinc-800/70"
    >
      <Reveal className="mx-auto w-full max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            {servicesSection.eyebrow}
          </p>
          <h2
            id="services-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50"
          >
            {servicesSection.heading}
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            {servicesSection.description}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-white/60 p-6 transition hover:-translate-y-0.5 hover:border-emerald-600/40 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-emerald-400/40"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400">
                {serviceIcons[service.icon]}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                {service.title}
              </h3>
              <div className="mt-3 flex-1">
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {service.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {service.includes.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="#contact"
                aria-label={`Contact me about ${service.title}`}
                onClick={() => handleSelectService(service.title)}
                className="mt-6 inline-flex items-center justify-center self-start rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                {servicesSection.ctaLabel}
              </a>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
