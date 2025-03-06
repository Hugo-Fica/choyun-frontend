import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/prisma'

export async function POST(req: NextRequest) {
  try {
    const { dataValidate } = await req.json()

    if (!dataValidate.password) {
      return NextResponse.json(
        { message: 'Error no se proporciono la contraseña' },
        { status: 400 }
      )
    }
    const usuario = await prisma.users.update({
      where: { id: dataValidate.user_id },
      data: { password: dataValidate.password }
    })
    if (!usuario) return NextResponse.json({ message: 'El usuario no existe' })

    return NextResponse.json({
      message: `Contraseña creada correctamente`
    })
  } catch (error) {
    return NextResponse.json({ message: 'Hubo un error', error: error }, { status: 500 })
  }
}
