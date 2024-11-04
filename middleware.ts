import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const user = request.cookies
  console.log(user)
}
