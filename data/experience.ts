export interface ExperienceEntry {
  id: string;
  title: string;
  institution: string;
  period: string;
  highlights: string[];
}

export interface ExperienceGroup {
  id: string;
  label: string;
  entries: ExperienceEntry[];
}

export interface ExperienceSectionContent {
  eyebrow: string;
  heading: string;
  description: string;
}

export const experienceSection: ExperienceSectionContent = {
  eyebrow: "Experience",
  heading: "Education and experience",
  description:
    "My studies at Masvingo Polytechnic and the industrial attachment where I put them into practice.",
};

export const experienceGroups: ExperienceGroup[] = [
  {
    id: "education",
    label: "Education",
    entries: [
      {
        id: "national-diploma-information-technology",
        title: "National Diploma in Information Technology",
        institution: "Masvingo Polytechnic",
        period: "2024 — 2026",
        highlights: [
          "Studying software development, databases, and modern web technologies with a focus on practical, locally relevant projects.",
          "Building full-stack applications that apply classroom concepts to real community problems.",
          "Strengthening my problem-solving, documentation, and collaboration skills through coursework and team projects.",
        ],
      },
    ],
  },
  {
    id: "industrial-attachment",
    label: "Industrial Attachment",
    entries: [
      {
        id: "software-development-attachment",
        title: "Software Development Attachment",
        institution: "Software Development Team",
        period: "January — December 2026",
        highlights: [
          "Contributed to SmartElderlyCare, an ASP.NET Core MVC care-coordination platform with role-based workflows and SQL Server reporting.",
          "Worked on features across patient registration, clinical alerts, and monthly DHIS2 reporting while following existing code conventions.",
          "Learned to review requirements, test changes, and collaborate with a development team before release.",
        ],
      },
    ],
  },
];
