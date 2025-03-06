import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/prisma'

export async function GET() {
  try {
    const classChoyun = await prisma.class.findMany()

    if (classChoyun.length < 1) return NextResponse.json({ message: 'No se encontraron clases' })
    return NextResponse.json({ classChoyun: classChoyun })
  } catch (error) {
    return NextResponse.json({ message: 'Hubo un error', error: error }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, schedule_id } = await req.json()

    if (!name || !schedule_id) {
      return NextResponse.json(
        { message: 'Error no se proporciono el nombre o el id del horario' },
        { status: 400 }
      )
    }
    const existsClass = await prisma.class.findFirst({ where: { name, schedule_id } })

    if (existsClass) return NextResponse.json({ message: 'Ya existe la clase' })

    const newClass = await prisma?.class.create({
      data: { name, schedule_id }
    })

    if (newClass) return NextResponse.json({ message: 'Clase creada', id_class: newClass.id })

    return NextResponse.json({ message: 'Error al crear la clase' })
  } catch (error) {
    return NextResponse.json({ message: 'Hubo un error', error: error }, { status: 500 })
  }
}
