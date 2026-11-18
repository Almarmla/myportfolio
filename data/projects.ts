export interface Project {
  id: string;
  title: string;
  description: string;
  problemSolved: string;
  solution: string;
  features: string[];
  techStack: string[];
  category: string;
  image: string;
  screenshots: string[];
  liveUrl: string;
  githubUrl: string;
  learned: string;
}

export const projects: Project[] = [
  {
    id: "smart-elderly-care",
    title: "SmartElderlyCare",
    description:
      "An ASP.NET Core MVC care-coordination platform that connects facility nurses, village health workers, records staff, and health administrators around a shared elderly-patient record.",
    problemSolved:
      "Elderly-care information in Zimbabwe is often split between paper registers, facility visits, and community health workers. Vital signs, welfare checks, and monthly returns live in different places, so clinical teams can miss deteriorating patients and reporting becomes a manual, error-prone exercise.",
    solution:
      "SmartElderlyCare brings registration, facility visits, community welfare checks, clinical alerts, and reporting into one role-based system. Facility nurses capture vital signs and treatment, village health workers submit simplified welfare observations, and records and HIU staff validate monthly returns and export DHIS2-ready CSV data.",
    features: [
      "Role-based access for nurses, village health workers, family, records staff, HIU clerks, administrators, and district medical officers",
      "Patient registration with chronic condition, care programme, and emergency contacts",
      "Facility visits with vital signs, diagnosis, treatment, and clinical notes",
      "Low-literacy VHW welfare checks covering mood, mobility, nutrition, and safety",
      "Configurable clinical thresholds that raise alerts for out-of-range vital signs",
      "Patient history, monthly return validation, DHIS2 CSV exports, and district reports",
      "Administrator audit logs, Identity lockout recovery, and database health checks",
    ],
    techStack: [
      "C#",
      ".NET 8",
      "ASP.NET Core MVC",
      "Razor",
      "Entity Framework Core",
      "SQL Server",
      "Bootstrap",
      "xUnit",
    ],
    category: "Healthcare",
    image: "/images/project-placeholder.svg",
    screenshots: [
      "/images/project-placeholder.svg",
      "/images/project-screenshot.svg",
    ],
    liveUrl: "",
    githubUrl: "https://github.com/Almarmla/SmartElderlyCare",
    learned:
      "SmartElderlyCare taught me to model a real clinical workflow across many roles, keep sensitive patient data behind role-based authorization, and turn operational records into auditable monthly reports.",
  },
];
