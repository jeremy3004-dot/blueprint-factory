import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();

  if (host === "admin.gptrek.com" && request.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
