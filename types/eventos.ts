export type eventos = {
  monthIndex: number
  setMonthIndex: (index: number) => void
  smallCalendarMonth: number
  setSmallCalendarMonth: (index: number) => void
  daySelected: string
  setDaySelected: (day: string) => void
}