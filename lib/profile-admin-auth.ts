import { Buffer } from "node:buffer";
import { timingSafeEqual } from "node:crypto";

const ADMIN_USERNAME = "owner";
const AUTH_CHALLENGE =
  'Basic realm="Profile photo editor", charset="UTF-8"';

function matchesAuthorization(provided: string, expected: string) {
  const providedBytes = Buffer.from(provided);
  const expectedBytes = Buffer.from(expected);

  return (
    providedBytes.length === expectedBytes.length &&
    timingSafeEqual(providedBytes, expectedBytes)
  );
}

export function getProfileAdminAuthResponse(
  request: Request,
): Response | null {
  const password = process.env.PROFILE_ADMIN_PASSWORD;

  if (!password) {
    return new Response(
      "Profile photo uploads are disabled until PROFILE_ADMIN_PASSWORD is configured.",
      { status: 503 },
    );
  }

  const expectedAuthorization = `Basic ${Buffer.from(
    `${ADMIN_USERNAME}:${password}`,
    "utf8",
  ).toString("base64")}`;
  const authorization = request.headers.get("authorization") ?? "";

  if (!matchesAuthorization(authorization, expectedAuthorization)) {
    return new Response("Authentication required.", {
      status: 401,
      headers: {
        "Cache-Control": "no-store",
        "WWW-Authenticate": AUTH_CHALLENGE,
      },
    });
  }

  return null;
}
