import type { Metadata } from "next";
import ProjectNotFound from "@/components/ProjectNotFound";

export const metadata: Metadata = {
  title: "Project not found",
};

export default function NotFound() {
  return <ProjectNotFound />;
}
