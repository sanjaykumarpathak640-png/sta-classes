import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Strict route protection for /admin routes (excluding /admin-login)
  const isAdminRoute = pathname === "/admin" || (pathname.startsWith("/admin/") && !pathname.startsWith("/admin-login"));
  if (isAdminRoute) {
    const adminAuthCookie = request.cookies.get("sta_admin_auth")?.value;
    const isValidAdmin = adminAuthCookie === "sta_admin_authenticated_secure_token" || adminAuthCookie === "true";

    if (!isValidAdmin) {
      const loginUrl = new URL("/admin-login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, svg, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

