import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;

    console.log("🔥 MIDDLEWARE RUNNING:", pathname);

    if (pathname === "/login") {
        console.log("🔥 REDIRECTING FROM LOGIN");
        return NextResponse.redirect(new URL("/category-product/foiling", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/:path*'], // Run on ALL routes
};
