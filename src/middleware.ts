import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

 
export function middleware(request: NextRequest) {
  
  const token = request.cookies.get('token')?.value

  // SI YA HA INICIADO SESIÓN E INTENTA ACCEDER A LA PÁGINA DE LOGIN, REDIRECCIONAR A LA PÁGINA DE ORDENES
  if (token && request.nextUrl.pathname.startsWith('/auth/login')) {
    return NextResponse.redirect(new URL('/panel-de-control', request.url))
  }
  
  /* if (token && request.nextUrl.pathname.startsWith('/')) {
    return NextResponse.redirect(new URL('/', request.url))
  } */

  // SI NO HA INICIADO SESIÓN E INTENTA ACCEDER A UNA PÁGINA QUE NO SEA EL LOGIN O EL ROOT (LANDING PAGE) REDIRECCIONAR A LA PÁGINA DE LOGIN
  if (!token && !request.nextUrl.pathname.startsWith('/auth/login') && !request.nextUrl.pathname.startsWith('/')) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // si no ha iniciado sesión e intenta acceder a una ruta que empiece por /ordenes, redirigir a la página de login
  if (!token && request.nextUrl.pathname.startsWith('/panel-de-control')) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}