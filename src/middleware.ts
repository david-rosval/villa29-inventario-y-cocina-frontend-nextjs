import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

 
export function middleware(request: NextRequest) {
  
  const token = request.cookies.get('token')?.value

  //console.log(token)
  
  if (token && !request.nextUrl.pathname.startsWith('/ordenes')) {
    return NextResponse.redirect(new URL('/ordenes', request.url))
  }
  
  if (!token && !request.nextUrl.pathname.startsWith('/')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!token && !request.nextUrl.pathname.startsWith('/auth/login')) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}