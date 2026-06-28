import { NextResponse } from "next/server";

import { createAdminSessionCookie, verifyAdminPassword } from "@/lib/admin-auth";

const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 8;

function rateLimitKey(email: string) {
  const normalizedEmail = email.trim().toLowerCase() || "unknown-email";

  return `bootstrap:${normalizedEmail}`;
}

function tooManyAttempts(key: string) {
  const now = Date.now();
  const attempt = loginAttempts.get(key);

  if (!attempt || attempt.resetAt <= now) {
    loginAttempts.set(key, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
    return false;
  }

  attempt.count += 1;
  return attempt.count > LOGIN_MAX_ATTEMPTS;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const key = rateLimitKey(email);

  if (tooManyAttempts(key)) {
    return NextResponse.redirect(new URL("/admin?login=limited", request.url), { status: 303 });
  }

  const identity = await verifyAdminPassword(email, password);

  if (!identity) {
    return NextResponse.redirect(new URL("/admin?login=failed", request.url), { status: 303 });
  }

  const sessionCookie = await createAdminSessionCookie(identity.email);
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/admin?login=unavailable", request.url), { status: 303 });
  }

  const response = NextResponse.redirect(new URL("/admin", request.url), { status: 303 });
  response.headers.set("Set-Cookie", sessionCookie);

  return response;
}
