import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;
    const isAuthenticated = !!token;

    if (isAuthenticated && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (!isAuthenticated && (pathname.startsWith('/profile') || pathname.startsWith('/editProfile'))) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/profile/:path*', '/login', '/register', '/editProfile/:path*'],
};
