import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const availableLocales = ["en-us", "pt-br"];

const defaultLocale = "en-us";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const locale = pathname.split("/")[1];

  console.log(locale)

  if (!availableLocales.includes(locale)) {
    const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
