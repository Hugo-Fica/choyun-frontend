import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/prisma'
import dayjs from 'dayjs'

export async function GET(request: NextRequest) {
  const user_id = request.nextUrl.pathname.split('/')[4]
  try {
    const user = await prisma.users.findUnique({
      where: { id: user_id },
      include: { role: { select: { name: true } } }
    })
    if (!user) return NextResponse.json({ message: 'No se encontró el usuario' })
    const adjustedDate = dayjs(user?.birthday).add(4, 'hour')
    const formattedBirthday = adjustedDate.format('DD/MM/YYYY')
    const userFinal = {
      email: user?.email,
      names: user?.names,
      lastnames: user?.lastnames,
      birthday: formattedBirthday,
      age: user?.age,
      phone: user?.phone,
      role: user?.role?.name
    }
    return NextResponse.json(userFinal)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Hubo un error', error: error }, { status: 500 })
  }
}
