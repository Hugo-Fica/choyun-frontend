import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/prisma'
import { CreateDayRequest } from '@/types/day'

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const day = searchParams.get('day')

    const whereClause: { day?: string } = {}
    if (day) {
      whereClause.day = day
    }

    const days = await prisma.day.findMany({
      where: whereClause,
      include: {
        schedule: true
      },
      orderBy: {
        date: 'asc'
      }
    })

    return NextResponse.json(days)
  } catch (error) {
    console.error('Error fetching days:', error)
    return NextResponse.json(
      { error: 'Error fetching days', details: (error as Error).message },
      { status: 500 }
    )
  }
}

// POST - Crear un nuevo día
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: CreateDayRequest = await request.json()
    const { day, date } = body

    // Validar los datos
    if (!day) {
      return NextResponse.json({ error: 'Day name is required' }, { status: 400 })
    }

    if (!date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 })
    }

    // Crear el día
    const newDay = await prisma.day.create({
      data: {
        day,
        date: new Date(date)
      }
    })

    return NextResponse.json(newDay, { status: 201 })
  } catch (error) {
    console.error('Error creating day:', error)
    return NextResponse.json(
      { error: 'Error creating day', details: (error as Error).message },
      { status: 500 }
    )
  }
}
