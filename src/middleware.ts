import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;

  // If no token is found, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Verify the token
    const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);
    await jwtVerify(token, secretKey);
    return NextResponse.next();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // If token verification fails, redirect to login
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("authToken");
    return response;
  }
}

// Only run middleware on dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"],
};
