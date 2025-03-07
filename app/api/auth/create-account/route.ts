import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/prisma'
import dayjs from 'dayjs'
import { generateOTP } from '@/utils/otp'
import { generarToken } from '@/utils/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, names, lastnames, age, phone, role_id, birthday } = await req.json()
    if (!email || !names || !lastnames || !age || !phone || !role_id || !birthday) {
      return NextResponse.json(
        {
          message:
            'Error no se proporciono el nombres o apellidos o contraseña o edad o número de celular o el rol del usuario'
        },
        { status: 400 }
      )
    }
    const existeUsuario = await prisma.users.findFirst({ where: { email } })
    if (existeUsuario)
      return NextResponse.json({ message: 'El correo electrónico ya se encuentra registrado' })

    const expiresAt = dayjs().add(5, 'minute').toDate()
    const nuevoUsuario = await prisma?.users.create({
      data: {
        email,
        names,
        lastnames,
        age,
        phone,
        role_id,
        birthday: new Date(birthday)
      }
    })
    if (nuevoUsuario) {
      await prisma.otp.deleteMany({ where: { user_id: nuevoUsuario?.id } })
      const token = generarToken(nuevoUsuario?.id, nuevoUsuario?.role_id, '300s')
      const userOtp = await prisma.otp.create({
        data: {
          code: generateOTP(),
          expiresAt,
          user_id: nuevoUsuario?.id,
          token
        }
      })
      return NextResponse.json({ message: 'Usuario creado', otp: userOtp })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Hubo un error' }, { status: 500 })
  }
}
