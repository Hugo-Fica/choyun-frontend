'use client'
import { getMonth } from '@/helpers/utils'
import { CalendarioHeader, Month, SidebarCalendario } from '..'
import { useState } from 'react'
import dayjs from 'dayjs'

export const Calendario = () => {
  const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs[][]>(getMonth())
  return (
    <div className='h-screen flex flex-col'>
      <CalendarioHeader />
      <div className='flex flex-1'>
        <SidebarCalendario />
        <Month month={currentMonth} />
      </div>
    </div>
  )
}
