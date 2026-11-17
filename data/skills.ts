export type SkillIcon =
  | "layout"
  | "code"
  | "react"
  | "next"
  | "wind"
  | "server"
  | "node"
  | "api"
  | "database"
  | "git"
  | "editor"
  | "terminal";

export interface Skill {
  name: string;
  level: number;
  icon: SkillIcon;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

export interface SkillsSectionContent {
  eyebrow: string;
  heading: string;
  description: string;
}

export const skillsSection: SkillsSectionContent = {
  eyebrow: "Skills",
  heading: "What I work with",
  description:
    "The frontend, backend, database, and tooling skills I use to design, build, and ship software for local communities.",
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML", level: 90, icon: "layout" },
      { name: "CSS", level: 85, icon: "layout" },
      { name: "JavaScript", level: 85, icon: "code" },
      { name: "TypeScript", level: 80, icon: "code" },
      { name: "React", level: 80, icon: "react" },
      { name: "Next.js", level: 75, icon: "next" },
      { name: "Tailwind CSS", level: 85, icon: "wind" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "C#", level: 80, icon: "server" },
      { name: "ASP.NET Core", level: 75, icon: "server" },
      { name: "Node.js", level: 70, icon: "node" },
      { name: "REST APIs", level: 75, icon: "api" },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "SQL Server", level: 75, icon: "database" },
      { name: "MySQL", level: 70, icon: "database" },
      { name: "PostgreSQL", level: 65, icon: "database" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", level: 85, icon: "git" },
      { name: "GitHub", level: 85, icon: "git" },
      { name: "VS Code", level: 90, icon: "editor" },
      { name: "Visual Studio", level: 80, icon: "editor" },
      { name: "Linux", level: 75, icon: "terminal" },
    ],
  },
];
