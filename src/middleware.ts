import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const isMaintenanceMode = false;

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (!isMaintenanceMode) {
        return NextResponse.next();
    }

    if (pathname === '/maintenance') {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/maintenance', req.url));
}

export const config = {
    matcher: '/((?!api|_next/static|favicon.ico).*)',
};
