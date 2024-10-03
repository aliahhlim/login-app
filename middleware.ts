import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const loggedInRoutes = ["/homepage"];
const loggedOutRoutes = ["/users"];

export default async function AuthMiddleware(
  req: NextRequest
): Promise<NextResponse> {
  console.log("Middleware - Request path:", req.nextUrl.pathname);
  
  let token;
  try {
    token = await getToken({ req, secret: 'V9LvBRPf7UEdmsnxTGopWPAucYoG3fCMmS3eSLsdtaU' });
    console.log("Middleware - Token:", token);
  } catch (error) {
    console.error("Error getting token:", error);
    //return NextResponse.redirect(new URL("/error", req.url));
  }

  const isLoggedInRoute = loggedInRoutes.some((path) => req.nextUrl.pathname.startsWith(path));
  const isLoggedOutRoute = loggedOutRoutes.some((path) => req.nextUrl.pathname.startsWith(path));

  if (!isLoggedInRoute && !isLoggedOutRoute) {
    return NextResponse.next();
  }

  console.log("Request path:", req.nextUrl.pathname);
  console.log("Token:", token);
  console.log("Is logged in route:", isLoggedInRoute);
  console.log("Is logged out route:", isLoggedOutRoute);

  if (!token && isLoggedInRoute) {
    return NextResponse.redirect(new URL("/users", req.url));
  }
  if (token && isLoggedOutRoute) {
    return NextResponse.redirect(new URL("/homepage", req.url));
  }

  return NextResponse.next();
}