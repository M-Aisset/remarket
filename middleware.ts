import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "@/i18n.config";
import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  if (!cookies().has("lang")) response.cookies.set("lang", i18n.defaultLocale);
  return response;
}
