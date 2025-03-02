import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken");
  const refreshToken = req.cookies.get("refreshToken");
  const url = req.nextUrl.clone();

  if (!accessToken && !refreshToken) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (!accessToken && refreshToken) {
    try {
      const res = await fetch("http://backend:3001/api/auth/refresh", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Cookie": `refreshToken=${refreshToken.value}`
        },
      });

      if (res.status === 403) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }

      const response = NextResponse.next();
      const setCookieHeaders = res.headers.getSetCookie();

      setCookieHeaders.forEach((cookie) => {
        const parts = cookie.split(";").map((part) => part.trim());
        const [ cookieName, cookieValue ] = parts[0].split("=");

        const cookieOptions: Partial<ResponseCookie> = {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          sameSite: "strict"
        };

        parts.forEach((part) => {
          if (part.startsWith("Max-Age=")) {
            cookieOptions.maxAge = parseInt(part.split("=")[1], 10);
          } else if (part.startsWith("Expires=")) {
            cookieOptions.expires = new Date(part.split("=")[1]);
          }
        });

        response.cookies.set(cookieName, cookieValue, cookieOptions);
      });
      return response;
    } catch (err) {
      console.error("Middleware -> Refresh Token Error:", err);
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [ "/dashboard/:path*", "/profile/:path*" ],
};
