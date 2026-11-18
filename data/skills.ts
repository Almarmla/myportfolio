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
    "Core languages, enterprise frameworks, and database technologies I use to build robust full-stack software and community health systems.",
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML & CSS", level: 90, icon: "layout" },
      { name: "JavaScript & TypeScript", level: 85, icon: "code" },
      { name: "React & Next.js (App Router)", level: 85, icon: "react" },
      { name: "Tailwind CSS", level: 90, icon: "wind" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "C# & .NET 8", level: 85, icon: "server" },
      { name: "ASP.NET Core MVC", level: 80, icon: "server" },
      { name: "Entity Framework Core", level: 80, icon: "database" },
      { name: "RESTful APIs", level: 80, icon: "api" },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "SQL Server", level: 80, icon: "database" },
      { name: "Relational Database Design", level: 80, icon: "database" },
      { name: "MySQL / PostgreSQL", level: 75, icon: "database" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git & GitHub", level: 85, icon: "git" },
      { name: "Visual Studio & VS Code", level: 90, icon: "editor" },
      { name: "Linux Environments", level: 75, icon: "terminal" },
    ],
  },
];
