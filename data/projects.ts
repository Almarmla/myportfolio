export type Project = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  image?: string;
  links?: {
    live?: string;
    repo?: string;
  };
};

export const projects: Project[] = [];
