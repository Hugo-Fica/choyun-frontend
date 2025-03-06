import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/prisma'
import { generarToken, validarToken } from '@/utils/auth'

export async function POST(req: NextRequest) {
  try {
    const { dataValidate } = await req.json()
    if (!dataValidate.tokenOTP) {
      return NextResponse.json({ message: 'Error no se proporciono un token' }, { status: 400 })
    }
    if (!dataValidate.OTP) {
      return NextResponse.json(
        { message: 'Error no se proporciono el código de verificación' },
        { status: 400 }
      )
    }
    const decoded = validarToken(dataValidate.tokenOTP)
    if (!decoded) {
      return NextResponse.json({ message: 'Token no válido' }, { status: 400 })
    }
    const usuario = await prisma.users.findFirst({ where: { id: decoded.user_id } })
    if (!usuario) return NextResponse.json({ message: 'El Usuario no existe' }, { status: 400 })
    const validOTP = await prisma.otp.findFirst({
      where: { user_id: usuario.id, code: dataValidate.OTP }
    })
    if (!validOTP)
      return NextResponse.json(
        { message: 'El código de verificación no es válido' },
        { status: 400 }
      )
    return NextResponse.json({
      message: `Usuario validado`,
      token: generarToken(usuario.id, usuario.role_id, '300s')
    })
  } catch (error) {
    return NextResponse.json({ message: 'Hubo un error', error: error }, { status: 500 })
  }
}
