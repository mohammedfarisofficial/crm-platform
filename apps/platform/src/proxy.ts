import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { URLS } from "@crm/utils/constants/urls";

export function proxy(request: NextRequest) {
  // Check for the accessToken and refreshToken cookies to verify if the user is logged in
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // If there is no access token and no refresh token, redirect them to the auth domain
  if (!accessToken && !refreshToken) {
    const signInUrl = `${URLS.AUTH_DOMAIN_BASE_URL}/sign-in`;
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
