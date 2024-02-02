'use client'
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import days from 'dayjs'
export default function AgendarUsuario() {
  const local = dayjsLocalizer(days)
  const events = [
    {
      start: days('2024-01-31T12:00:00').toDate(),
      end: days('2024-01-31T12:00:00').toDate(),
      title: 'evento 1',
    },
    {
      start: days('2024-02-01T12:00:00').toDate(),
      end: days('2024-02-03T12:00:00').toDate(),
      title: 'evento 1',
    },
    {
      start: days('2024-02-03T12:00:00').toDate(),
      end: days('2024-02-10T12:00:00').toDate(),
      title: 'evento 1',
    },
  ]
  return (
    <div className='h-[500px] w-[1200px]'>
      <Calendar localizer={local} events={events} culture='es' />
    </div>
  )
}
