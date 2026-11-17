import { profile } from "@/data/profile";

export type SocialIconName = "email" | "github" | "linkedin" | "phone";

export interface SocialLink {
  label: string;
  value: string;
  href: string;
  icon: SocialIconName;
}

export const socialLinks: SocialLink[] = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: "email",
  },
  {
    label: "GitHub",
    value: profile.github.replace(/^https?:\/\//, ""),
    href: profile.github,
    icon: "github",
  },
  {
    label: "LinkedIn",
    value: profile.linkedin.replace(/^https?:\/\//, ""),
    href: profile.linkedin,
    icon: "linkedin",
  },
  {
    label: "Call / WhatsApp",
    value: "0775726114",
    href: "tel:+263775726114",
    icon: "phone",
  },
  {
    label: "Call / WhatsApp",
    value: "0717065055",
    href: "tel:+263717065055",
    icon: "phone",
  },
];
