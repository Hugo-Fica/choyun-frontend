import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/prisma'
import bcrypt from 'bcrypt'
import { generarToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Error no se proporciono el correo electrónico o la contraseña' },
        { status: 400 }
      )
    }
    const usuario = await prisma.users.findFirst({ where: { email } })
    if (!usuario) return NextResponse.json({ message: 'El correo electrónico no existe' })
    const isValidPassword = await bcrypt.compare(password, usuario?.password)
    if (!isValidPassword)
      return NextResponse.json({
        message: 'El correo electrónico o la contraseña no son correctos'
      })
    const token = generarToken(usuario.id, usuario.role_id)
    return NextResponse.json({ message: `Bienvenido ${usuario.names}`, token })
  } catch (error) {
    return NextResponse.json({ message: 'Hubo un error', error: error }, { status: 500 })
  }
}
