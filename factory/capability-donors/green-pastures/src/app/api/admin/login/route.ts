import { NextResponse } from "next/server";

import { createAdminSessionCookie, verifyAdminPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
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
