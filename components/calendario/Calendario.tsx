'use client'
import { useEffect, useState } from 'react'
import { Dosis } from 'next/font/google'
import dayjs from 'dayjs'
import { getMonth } from '@/helpers/utils'
import { CalendarioHeader, Month, SidebarCalendario } from '..'
import { useEventosStore } from '@/store/eventos'

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
