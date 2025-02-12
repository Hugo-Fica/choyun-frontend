import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/prisma'

export async function GET() {
  try {
    const days = await prisma.day.findMany()
    if (days.length < 1) return NextResponse.json({ message: 'No se encontraron días' })
    return NextResponse.json({ days: days })
  } catch (error) {
    return NextResponse.json({ message: 'Hubo un error', error: error }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { day_name } = await req.json()

    if (!day_name) {
      return NextResponse.json(
        { message: 'Error no se proporciono el nombre del día' },
        { status: 400 }
      )
    }

    const existsDay = await prisma.day.findFirst({ where: { day_name } })
    if (existsDay) return NextResponse.json({ message: 'Ya existe el día' })

    const newDay = await prisma?.day.create({
      data: { day_name }
    })

    if (newDay) return NextResponse.json({ message: 'Día creado', id_day: newDay.id })

    return NextResponse.json({ message: 'Error al crear el día' })
  } catch (error) {
    return NextResponse.json({ message: 'Hubo un error', error: error }, { status: 500 })
  }
}
