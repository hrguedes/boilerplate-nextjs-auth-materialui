import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const isLogged = request.cookies.get('micro-erp.isLogged');
  if (isLogged) {
    if (isLogged?.value === 'True') {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }
  return NextResponse.next();
}