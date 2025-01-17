import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { type eventos } from '@/types/eventos'
import dayjs from 'dayjs'

export const useEventosStore = create<eventos>()(
  devtools(
    persist(
      (set, get) => {
        return {
          monthIndex: dayjs().month(),
          smallCalendarMonth: dayjs().month(),
          daySelected: '',
          setMonthIndex: (index) => {
            set({ monthIndex: index }, false, 'cambio_mes')
          },
          setSmallCalendarMonth: (index) => {
            set({ smallCalendarMonth: index }, false, 'small_calendar')
            const { smallCalendarMonth } = get()
            if (smallCalendarMonth !== null) {
              set({ monthIndex: smallCalendarMonth })
            }
          },
          setDaySelected: (day) => {
            set({ daySelected: day }, false, 'dia_seleccionado')
          }
        }
      },
      { name: 'eventos-calendario' }
    )
  )
)
