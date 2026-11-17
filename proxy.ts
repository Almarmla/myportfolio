import { NextResponse, type NextRequest } from "next/server";
import { projects } from "@/data/projects";
import { getProfileAdminAuthResponse } from "@/lib/profile-admin-auth";

const projectNotFoundPath = "/projects/not-found";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProfileAdminPage =
    pathname === "/admin" || pathname.startsWith("/admin/");
  const isProfilePhotoUpload =
    pathname === "/api/profile-photo" &&
    request.method !== "GET" &&
    request.method !== "HEAD";

  if (isProfileAdminPage || isProfilePhotoUpload) {
    const authResponse = getProfileAdminAuthResponse(request);

    if (authResponse) {
      return authResponse;
    }
  }

  if (isProfileAdminPage || pathname === "/api/profile-photo") {
    return NextResponse.next();
  }

  if (pathname === projectNotFoundPath) {
    return NextResponse.next();
  }

  const id = pathname.split("/")[2];
  const isKnownProject = projects.some((project) => project.id === id);

  if (isKnownProject) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = projectNotFoundPath;
  url.search = "";

  return NextResponse.rewrite(url, { status: 404 });
}

export const config = {
  matcher: [
    "/projects/:id",
    "/admin",
    "/admin/:path*",
    "/api/profile-photo",
  ],
};
