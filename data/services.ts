export type ServiceIcon = "document" | "sparkles" | "code";

export interface Service {
  title: string;
  description: string;
  icon: ServiceIcon;
  includes: string[];
}

export interface ServicesSectionContent {
  eyebrow: string;
  heading: string;
  description: string;
  ctaLabel: string;
}

export const SERVICE_SELECT_EVENT = "select-service";

export const servicesSection: ServicesSectionContent = {
  eyebrow: "Services",
  heading: "How I can help",
  description:
    "Practical support for your writing, research, and community software projects.",
  ctaLabel: "Contact Me",
};

export const services: Service[] = [
  {
    title: "Dissertation Writing Assistance",
    description:
      "Guidance with research structure, referencing, and editing so your dissertation is clear, consistent, and ready to submit.",
    icon: "document",
    includes: [
      "Research topic and proposal guidance",
      "Chapter structure and referencing support",
      "Proofreading, editing, and final formatting",
    ],
  },
  {
    title: "AI-to-Human Content Rewriting",
    description:
      "Turning AI-assisted drafts into natural, readable writing that keeps your voice and sounds like you.",
    icon: "sparkles",
    includes: [
      "Natural tone and flow rewriting",
      "Plagiarism-conscious paraphrasing",
      "Consistency checks for voice and style",
    ],
  },
  {
    title: "Software Solutions for Local Communities",
    description:
      "Simple, affordable websites and tools built around real community needs, from idea through to launch.",
    icon: "code",
    includes: [
      "Needs discovery and project planning",
      "Website and tool development",
      "Deployment, training, and support",
    ],
  },
];
