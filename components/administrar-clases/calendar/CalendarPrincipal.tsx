'use client'

import { Card, CardContent } from '@/components/ui/card'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { Calendar, dateFnsLocalizer, View, Views } from 'react-big-calendar'
import { format } from 'date-fns/format'
import { parse } from 'date-fns/parse'
import { startOfWeek } from 'date-fns/startOfWeek'
import { getDay } from 'date-fns/getDay'
import { es } from 'date-fns/locale'
import dayjs from 'dayjs'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const locales = {
  es: es
}
const DnDCalendar = withDragAndDrop(Calendar)
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})
export const CalendarPrincipal = () => {
  const [date, setDate] = useState<Date>(new Date())
  const [events, setEvents] = useState<Event[]>([])
  const [view, setView] = useState<View>(Views.MONTH)
  const [isNewEventDialogOpen, setIsNewEventDialogOpen] = useState(false)

  return (
    <div className='flex flex-col justify-center pt-12'>
      {/* <div className="h-full flex flex-col p-4"> */}
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-bold'>Calendario de Clases</h2>
        <div className='flex gap-2'>
          <Select
            value={view}
            onValueChange={(v) => setView(v as View)}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Selecciona una vista' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Views.DAY}>Día</SelectItem>
              <SelectItem value={Views.WEEK}>Semana</SelectItem>
              <SelectItem value={Views.MONTH}>Mes</SelectItem>
              <SelectItem value={Views.AGENDA}>Agenda</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={() => setIsNewEventDialogOpen(true)}
            size='sm'
            className='gap-1'>
            <Plus size={16} /> Nueva Clase
          </Button>
        </div>
      </div>
      <Card className='flex-1'>
        <CardContent className='p-0 h-full'>
          <DnDCalendar
            localizer={localizer}
            events={events}
            // startAccessor='start'
            // endAccessor='end'
            style={{ height: '45rem' }}
            views={['month', 'week', 'day', 'agenda']}
            view={view}
            onView={setView}
            date={date}
            onNavigate={setDate}
            selectable
            resizable
            // onSelectSlot={handleSelectSlot}
            // onSelectEvent={handleSelectEvent}
            // onEventDrop={handleEventDrop}
            // onEventResize={handleEventResize}
            // eventPropGetter={eventPropGetter}
            // components={components}
            culture='es'
            messages={{
              today: 'Hoy',
              previous: 'Anterior',
              next: 'Siguiente',
              month: 'Mes',
              week: 'Semana',
              day: 'Día',
              agenda: 'Agenda',
              date: 'Fecha',
              time: 'Hora',
              event: 'Evento',
              showMore: (total) => `+ Ver más (${total})`
            }}
            popup
          />
        </CardContent>
      </Card>
    </div>
  )
}
