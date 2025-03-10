import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/prisma'
import { CreateScheduleRequest } from '@/types/schedule'
// GET - Obtener todos los horarios
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const dayId = searchParams.get('dayId')

    const whereClause: any = {}
    if (dayId) {
      whereClause.dayId = dayId
    }

    const schedules = await prisma.schedule.findMany({
      where: whereClause,
      include: {
        day: true,
        classes: true
      },
      orderBy: [{ day: { date: 'asc' } }, { startTime: 'asc' }]
    })

    return NextResponse.json(schedules)
  } catch (error: any) {
    console.error('Error fetching schedules:', error)
    return NextResponse.json(
      { error: 'Error fetching schedules', details: error.message },
      { status: 500 }
    )
  }
}

// POST - Crear un nuevo horario
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: CreateScheduleRequest = await request.json()
    const { startTime, endTime, dayId, classIds = [] } = body

    // Validar los datos
    if (!startTime || !endTime) {
      return NextResponse.json({ error: 'Start time and end time are required' }, { status: 400 })
    }

    if (!dayId) {
      return NextResponse.json({ error: 'Day ID is required' }, { status: 400 })
    }

    // Verificar que el día existe
    const dayExists = await prisma.day.findUnique({
      where: { id: dayId }
    })

    if (!dayExists) {
      return NextResponse.json({ error: 'Day not found' }, { status: 404 })
    }

    // Si se proporcionan IDs de clases, verificar que existen
    if (classIds.length > 0) {
      const existingClasses = await prisma.class.findMany({
        where: {
          id: {
            in: classIds
          }
        }
      })

      if (existingClasses.length !== classIds.length) {
        return NextResponse.json({ error: 'One or more class IDs are invalid' }, { status: 400 })
      }
    }

    // Crear el horario
    const newSchedule = await prisma.schedule.create({
      data: {
        startTime,
        endTime,
        dayId,
        classIds
      }
    })

    // También actualizar las clases para añadir la referencia al horario
    if (classIds.length > 0) {
      await Promise.all(
        classIds.map((classId) =>
          prisma.class.update({
            where: { id: classId },
            data: {
              scheduleIds: {
                push: newSchedule.id
              }
            }
          })
        )
      )
    }

    return NextResponse.json(newSchedule, { status: 201 })
  } catch (error: any) {
    console.error('Error creating schedule:', error)
    return NextResponse.json(
      { error: 'Error creating schedule', details: error.message },
      { status: 500 }
    )
  }
}
