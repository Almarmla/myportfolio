import { profile } from "@/data/profile";
import { projects as curatedProjects } from "@/data/projects";

type GitHubApiRepository = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  private: boolean;
  fork: boolean;
  archived: boolean;
  pushed_at: string | null;
  stargazers_count: number;
};

function isGitHubApiRepository(value: unknown): value is GitHubApiRepository {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const repository = value as Record<string, unknown>;

  return (
    typeof repository.id === "number" &&
    typeof repository.name === "string" &&
    (typeof repository.description === "string" ||
      repository.description === null) &&
    (typeof repository.language === "string" ||
      repository.language === null) &&
    typeof repository.private === "boolean" &&
    typeof repository.fork === "boolean" &&
    typeof repository.archived === "boolean" &&
    (typeof repository.pushed_at === "string" ||
      repository.pushed_at === null) &&
    typeof repository.stargazers_count === "number"
  );
}

export async function GET() {
  const profileUrl = new URL(profile.github);
  const owner = profileUrl.pathname.split("/").filter(Boolean)[0];

  if (profileUrl.origin !== "https://github.com" || !owner) {
    return Response.json(
      { error: "The GitHub profile URL is not configured correctly." },
      { status: 500 },
    );
  }

  const apiUrl = new URL(
    `/users/${encodeURIComponent(owner)}/repos`,
    "https://api.github.com",
  );
  apiUrl.searchParams.set("type", "owner");
  apiUrl.searchParams.set("sort", "pushed");
  apiUrl.searchParams.set("direction", "desc");
  apiUrl.searchParams.set("per_page", "100");

  const response = await fetch(apiUrl, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    return Response.json(
      { error: `GitHub API returned status ${response.status}.` },
      { status: 502 },
    );
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data) || !data.every(isGitHubApiRepository)) {
    return Response.json(
      { error: "GitHub returned an unexpected repositories response." },
      { status: 502 },
    );
  }

  const curatedRepositoryUrls = new Set(
    curatedProjects
      .map((project) => project.githubUrl.replace(/\/$/, "").toLowerCase())
      .filter(Boolean),
  );

  const repositories = data
    .filter(
      (repository) =>
        !repository.private && !repository.fork && !repository.archived,
    )
    .flatMap((repository) => {
      const url = `https://github.com/${encodeURIComponent(owner)}/${encodeURIComponent(repository.name)}`;

      if (curatedRepositoryUrls.has(url.toLowerCase())) {
        return [];
      }

      return [
        {
          id: repository.id,
          name: repository.name,
          description: repository.description,
          language: repository.language,
          url,
          stars: repository.stargazers_count,
          pushedAt: repository.pushed_at,
        },
      ];
    });

  return Response.json(repositories);
}
