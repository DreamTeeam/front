import { NextRequest, NextResponse } from "next/server";
import { routes } from "./app/routes";
import { accessControl } from "./app/helpers/accessControl";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("access_token")?.value;

  const isPublic = accessControl.publicRoutes.some((r) => {
    if (r === '/') return pathname === r;
    return pathname.startsWith(r);
  });

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL(routes.public.login, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|assets|public).*)"],
};