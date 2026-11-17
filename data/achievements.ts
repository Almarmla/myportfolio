export interface Achievement {
  id: string;
  title: string;
  text: string;
  person?: string;
  role?: string;
}

export interface AchievementsSectionContent {
  eyebrow: string;
  heading: string;
  description: string;
}

export const achievementsSection: AchievementsSectionContent = {
  eyebrow: "Achievements",
  heading: "Achievements & testimonials",
  description:
    "Placeholder highlights from my studies and community projects. Replace these cards with awards, certifications, or feedback from people I've worked with.",
};

export const achievements: Achievement[] = [
  {
    id: "community-project-impact",
    title: "Community project impact",
    text: "Placeholder: describe an achievement such as a tool you built, a problem you solved, or a measurable result for a local organisation.",
  },
  {
    id: "academic-recognition",
    title: "Academic recognition",
    text: "Placeholder: add an award, certification, competition result, or a subject where you did particularly well.",
  },
  {
    id: "collaborator-testimonial",
    title: "A word from a collaborator",
    text: "Placeholder testimonial: add a short quote about your reliability, communication, or the quality of your work.",
    person: "Person Name",
    role: "Role, Organisation",
  },
];
