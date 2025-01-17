'use client'
import { useEffect, useState } from 'react'
import { Dosis } from 'next/font/google'
import dayjs from 'dayjs'
import { getMonth } from '@/helpers/utils'
import { useEventosStore } from '@/store/eventosStore'
import { CalendarioHeader } from './CalendarioHeader'
import { SidebarCalendario } from './SidebarCalendario'
import { Month } from './Month'

const dosis = Dosis({ subsets: ['latin'], weight: '500' })
export const Calendario = () => {
  const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs[][]>(getMonth())
  const monthIndex = useEventosStore((state) => state.monthIndex)
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex])
  return (
    <div className={`${dosis.className} h-screen flex flex-col`}>
      <CalendarioHeader />
      <div className='flex '>
        <SidebarCalendario />
        <Month month={currentMonth} />
      </div>
    </div>
  )
}
