import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/prisma'
import { UpdateDayRequest } from '@/types/day'
import { RouteParams } from '@/types/global'

// GET - Obtener un día específico por ID
export async function GET(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    const { id } = params

    const day = await prisma.day.findUnique({
      where: { id },
      include: {
        schedule: {
          include: {
            classes: true
          }
        }
      }
    })

    if (!day) {
      return NextResponse.json({ error: 'Day not found' }, { status: 404 })
    }

    return NextResponse.json(day)
  } catch (error: any) {
    console.error('Error fetching day:', error)
    return NextResponse.json(
      { error: 'Error fetching day', details: error.message },
      { status: 500 }
    )
  }
}

// PUT - Actualizar un día
export async function PUT(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    const { id } = params
    const body: UpdateDayRequest = await request.json()
    const { day, date } = body

    // Verificar que el día existe
    const existingDay = await prisma.day.findUnique({
      where: { id }
    })

    if (!existingDay) {
      return NextResponse.json({ error: 'Day not found' }, { status: 404 })
    }

    // Datos para actualizar
    const updateData: any = {}
    if (day !== undefined) updateData.day = day
    if (date !== undefined) updateData.date = new Date(date)

    // Actualizar el día
    const updatedDay = await prisma.day.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json(updatedDay)
  } catch (error: any) {
    console.error('Error updating day:', error)
    return NextResponse.json(
      { error: 'Error updating day', details: error.message },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar un día
export async function DELETE(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    const { id } = params

    // Verificar que el día existe
    const existingDay = await prisma.day.findUnique({
      where: { id },
      include: { schedule: true }
    })

    if (!existingDay) {
      return NextResponse.json({ error: 'Day not found' }, { status: 404 })
    }

    // Verificar si hay horarios asociados
    if (existingDay.schedule && existingDay.schedule.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete day with associated schedules. Remove schedules first.' },
        { status: 400 }
      )
    }

    // Eliminar el día
    await prisma.day.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Day deleted successfully' }, { status: 200 })
  } catch (error: any) {
    console.error('Error deleting day:', error)
    return NextResponse.json(
      { error: 'Error deleting day', details: error.message },
      { status: 500 }
    )
  }
}
