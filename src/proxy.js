import { NextResponse } from "next/server";


function isExpired(token) {
    try {
        const payload = JSON.parse(
            Buffer.from(token.split(".")[1], "base64").toString()
        )
        return payload.exp * 1000 < Date.now()
    } catch {
        return true
    }
}

export async function proxy(req) {
    const authRoute = ["/login", "/signup"];
    const protectedRoute = ["/my-profile"];
    const pathName = req.nextUrl.pathname;
    const token = req.cookies.get("auth_token")?.value;
    const validToken = token && !isExpired(token);
    const isAuthRoute = authRoute.find((route) => pathName.startsWith(route));
    const isProtectedRoute = protectedRoute.find((route) => pathName.startsWith(route));

    if (isAuthRoute && validToken) {
        return NextResponse.redirect(new URL("/my-profile", req.url));
    }

    if (isProtectedRoute && !validToken) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}
export const config = {
    matcher: [
        '/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
    ],
}
