import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  
  // Check if the user is authenticated
  if (!token) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

// Specify the paths that this middleware should be applied to
export const config = {
  matcher: ["/dashboard/:path*", "/edit/:path*"],
};