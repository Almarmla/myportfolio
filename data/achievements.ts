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
    "Highlights from my academic coursework at Masvingo Polytechnic and practical community software projects.",
};

export const achievements: Achievement[] = [
  {
    id: "smart-elderly-care",
    title: "SmartElderlyCare community project",
    text: "Contributed to SmartElderlyCare, a community-focused project exploring how digital tools can improve care coordination and support DHIS2 reporting.",
  },
  {
    id: "information-technology-coursework",
    title: "Information Technology studies",
    text: "Building a practical foundation in Information Technology at Masvingo Polytechnic through coursework that connects core concepts with real-world problem solving.",
  },
  {
    id: "teamwork-testimonial",
    title: "A teammate's perspective",
    text: "“Almar approaches challenges with practical thinking and works collaboratively to help the team find solutions.”",
    person: "Project teammate",
    role: "Collaborator",
  },
];
