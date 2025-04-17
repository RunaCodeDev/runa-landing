import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const defaultLocale = "es";
const locales = ["en", "es"];

function redirectToDefaultLocale(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${search}`, request.url)
    );
  }
}

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
});

export default function middleware(request: NextRequest) {
  const response = redirectToDefaultLocale(request);
  if (response) return response;
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(es|en)/:path*", "!/sitemap.xml", "!/robots.txt"],
};
