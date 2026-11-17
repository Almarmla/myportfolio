import { profile } from "@/data/profile";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://almar.example.com"
).replace(/\/$/, "");

export const siteName = `${profile.name} Portfolio`;

export const siteTitle = `${profile.name} | IT Student & Developer`;

export const siteDescription = `Portfolio of ${profile.name}, an IT student in ${profile.location} building practical websites, tools, and community-focused software.`;

export const siteOgImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: `${profile.name} - IT student and developer building software for local communities`,
  type: "image/png",
};
