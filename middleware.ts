import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const urlPath = request.nextUrl.pathname

  if (token && (urlPath === '/inicio-sesion' || urlPath === '/crear-cuenta')) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  if (!token && (urlPath.startsWith('/api/protected/') || urlPath.startsWith('/auth/'))) {
    return NextResponse.redirect(new URL('/inicio-sesion', request.url))
  }

  return NextResponse.next()
}
export const config = {
  matcher: ['/inicio-sesion', '/crear-cuenta', '/auth/:path*', '/api/protected/:path*']
}
