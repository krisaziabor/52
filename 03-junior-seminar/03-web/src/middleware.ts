import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Mobile device restriction has been removed
  return NextResponse.next();
}

// Keeping the matcher configuration in case we need to add other middleware functionality
export const config = {
  matcher: '/edgewood/:path*',
};