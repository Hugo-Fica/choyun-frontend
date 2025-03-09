import { NextResponse, type NextRequest } from 'next/server'
import { validarTokenEdge } from './utils/auth'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const urlPath = request.nextUrl.pathname
  const tokenOtp = request.nextUrl.searchParams.get('token')
  if (
    token &&
    (urlPath === '/inicio-sesion' ||
      urlPath === '/crear-cuenta' ||
      urlPath === '/validate-otp' ||
      urlPath === '/validate-otp/create-password')
  ) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (urlPath === '/validate-otp' || urlPath === '/validate-otp/create-password') {
    if (!tokenOtp) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    try {
      const decoded = await validarTokenEdge(tokenOtp)

      if (!decoded) {
        return NextResponse.redirect(new URL('/', request.url))
      }

      const response = NextResponse.next()
      response.headers.set('x-user-id', decoded.user_id)
      return response
    } catch (error) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  if (!token && (urlPath.startsWith('/api/protected/') || urlPath.startsWith('/auth/'))) {
    return NextResponse.redirect(new URL('/inicio-sesion', request.url))
  }

  return NextResponse.next()
}
export const config = {
  matcher: [
    '/inicio-sesion',
    '/crear-cuenta',
    '/validate-otp',
    '/validate-otp/create-password',
    '/auth/:path*',
    '/api/protected/:path*'
  ]
}
