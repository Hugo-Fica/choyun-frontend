import { generarToken } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { userId, roleId } = await req.json()

    const token = generarToken(userId, roleId, '1s')

    const response = NextResponse.json({ message: `Nos vemos`, token })
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1,
      path: '/',
      sameSite: 'lax'
    })

    return response
  } catch (error) {
    return NextResponse.json({ message: 'Hubo un error', error: error }, { status: 500 })
  }
}
