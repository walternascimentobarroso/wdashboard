import { NextRequest, NextResponse } from 'next/server';
import { mockAuthService } from '@/modules/auth/services/auth';

// Public routes that don't require authentication
const publicRoutes = ['/login'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is public
  if (publicRoutes.includes(pathname)) {
    // If user is already authenticated, redirect to dashboard
    const token = request.cookies.get('auth_token')?.value;
    if (token) {
      try {
        await mockAuthService.verifyToken(token);
        return NextResponse.redirect(new URL('/dashboard', request.url));
      } catch (error) {
        // Token is invalid, continue to public route
      }
    }
    return NextResponse.next();
  }

  // For protected routes, check authentication
  const token = request.cookies.get('auth_token')?.value;
  
  if (!token) {
    // No token found, redirect to login
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Verify token
    const verification = await mockAuthService.verifyToken(token);
    
    if (!verification.valid) {
      // Token is invalid, redirect to login
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Token is valid, continue to protected route
    return NextResponse.next();
  } catch (error) {
    // Error verifying token, redirect to login
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
