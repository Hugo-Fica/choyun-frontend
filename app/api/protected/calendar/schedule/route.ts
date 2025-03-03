import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/prisma'
export async function GET() {
  try {
    const schedules = await prisma.schedule.findMany()
    if (schedules.length < 1)
      return NextResponse.json({ message: 'No se encontraron horarios de clase' })
    return NextResponse.json({ schedules: schedules })
  } catch (error) {
    return NextResponse.json({ message: 'Hubo un error', error: error }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { start_time, end_time, day_id } = await req.json()

    if (!start_time || !end_time || !day_id) {
      return NextResponse.json({ message: 'Error no se proporcionaron los datos' }, { status: 400 })
    }

    const existsDay = await prisma.schedule.findFirst({ where: { start_time, end_time, day_id } })

    if (existsDay) return NextResponse.json({ message: 'Ya existe el horario de clase' })

    const newSchedule = await prisma?.schedule.create({
      data: { start_time, end_time, day_id }
    })

    if (newSchedule)
      return NextResponse.json({ message: 'Horario de clase creado', id_schedule: newSchedule.id })

    return NextResponse.json({ message: 'Error al crear el horario de clase' })
  } catch (error) {
    return NextResponse.json({ message: 'Hubo un error', error: error }, { status: 500 })
  }
}
