import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Project not found",
};

export default function ProjectNotFoundLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
