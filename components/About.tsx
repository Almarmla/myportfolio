import Reveal from "@/components/Reveal";
import { profile } from "@/data/profile";

type AboutHighlight = {
  title: string;
  description: string;
};

type AboutContent = {
  eyebrow: string;
  heading: string;
  highlights: AboutHighlight[];
};

const aboutContent: AboutContent[] = [
  {
    eyebrow: "About",
    heading: `A student developer from ${profile.location}`,
    highlights: [
      {
        title: "Problem Solver",
        description:
          "I enjoy breaking down real-world challenges and turning them into simple, practical software.",
      },
      {
        title: "Community Focused",
        description:
          "My work starts with people close to home, with a focus on tools that make a local impact.",
      },
      {
        title: "Always Learning",
        description:
          "I'm continuously growing my skills across Next.js, C#, and modern web development.",
      },
    ],
  },
];

export default function About() {
  const [about] = aboutContent;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-16 border-t border-zinc-200/70 py-24 sm:py-28 dark:border-zinc-800/70"
    >
      <Reveal className="mx-auto w-full max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            {about.eyebrow}
          </p>
          <h2
            id="about-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50"
          >
            {about.heading}
          </h2>
          <p className="mt-6 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            {profile.bio}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {about.highlights.map((highlight) => (
            <article
              key={highlight.title}
              className="rounded-2xl border border-zinc-200 bg-white/60 p-6 dark:border-zinc-800 dark:bg-zinc-900/40"
            >
              <span
                aria-hidden="true"
                className="block h-1 w-10 rounded-full bg-emerald-500"
              />
              <h3 className="mt-5 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                {highlight.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {highlight.description}
              </p>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
