import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "@/i18n.config";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const defaultLocale = request.cookies.has("lang")
      ? (request.cookies.get("lang")?.value as string)
      : i18n.defaultLocale;
    const redirectUrl = new URL(`/${defaultLocale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url);
    redirectUrl.search = search;
    return NextResponse.redirect(redirectUrl);
  }

  const response = NextResponse.next();
  response.cookies.set("lang", pathname.split("/")[1]);
  return response;
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
