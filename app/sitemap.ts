import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site";

const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.id}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
