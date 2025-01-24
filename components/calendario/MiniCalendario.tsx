'use client'
import { Fragment, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { ChevronLeftIcon, ChevronRightIcon } from '@primer/octicons-react'
import { useEventosStore } from '@/store/eventosStore'
import { getMonth } from '@/helpers/utils'

export const MiniCalendario = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month())
  const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs[][]>(getMonth())
  const { monthIndex, setSmallCalendarMonth, setDaySelected, daySelected } = useEventosStore(
    (state) => state
  )

  const handleMesSiguiente = () => {
    setCurrentMonthIndex(currentMonthIndex + 1)
  }
  const handleMesAnterior = () => {
    setCurrentMonthIndex(currentMonthIndex - 1)
  }
  const handleMiniCalendario = (day: dayjs.Dayjs) => () => {
    setSmallCalendarMonth(currentMonthIndex)
    setDaySelected(day.format('DD-MM-YY'))
    console.log(day)
  }
  const getDayClass = (day: dayjs.Dayjs) => {
    const format = 'DD-MM-YY'
    const nowDay = dayjs().format(format)
    const currentDay = day.format(format)
    if (nowDay === currentDay) {
      return 'bg-blue-500 rounded-full text-white'
    } else if (currentDay === daySelected) {
      return 'bg-blue-100 rounded-full text-blue-600 font-bold'
    } else {
      return ''
    }
  }
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIndex))
  }, [currentMonthIndex])
  useEffect(() => {
    const currentMonthIndex = dayjs().month()
    if (monthIndex === currentMonthIndex) {
      setCurrentMonthIndex(dayjs().month())
    }
  }, [monthIndex])
  return (
    <div className='mt-9'>
      <header className=' flex justify-between'>
        <p className='text-gray-500'>
          {dayjs(new Date(dayjs().year(), currentMonthIndex)).locale('es').format('MMMM YYYY')}
        </p>
        <button
          className='-translate-y-[13px]'
          onClick={handleMesAnterior}>
          <ChevronLeftIcon size={'medium'} />
        </button>
        <button
          className='-translate-y-[13px]'
          onClick={handleMesSiguiente}>
          <ChevronRightIcon size={'medium'} />
        </button>
      </header>
      <div className='grid grid-cols-7 grid-rows-6'>
        {currentMonth[0].map((day, i) => (
          <span
            key={i}
            className='text-sm py-1 text-center'>
            {day.locale('es').format('dd').charAt(0).toUpperCase()}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                onClick={handleMiniCalendario(day)}
                className={`${getDayClass(day)} py-1 w-full`}>
                <span className='text-sm'>{day.format('D')}</span>
              </button>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
