import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { ADMIN_COOKIE_NAME, isValidSessionToken } from "./lib/auth";

export const config = {
  matcher: ["/studio/dashboard/:path*", "/studio/api/:path*"],
};

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/studio/api/login")) {
    return NextResponse.next();
  }

  const { env } = getRequestContext();
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const valid = await isValidSessionToken(token, env.ADMIN_PASSWORD);

  if (!valid) {
    if (pathname.startsWith("/studio/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/studio", req.url));
  }

  return NextResponse.next();
}
