'use client'

import React, { Dispatch, SetStateAction, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { CheckIcon, ChevronLeft, ChevronRight } from 'lucide-react'

type DatePickerStep = 'año' | 'mes' | 'dia' | 'display'

type Props = {
  onChange: (value: string) => void
  setOpenDatePicker: Dispatch<SetStateAction<boolean>>
}
export const DatePicker = ({ onChange, setOpenDatePicker }: Props) => {
  const [step, setStep] = useState<DatePickerStep>('año')
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const handleYearSelect = (year: string) => {
    setSelectedYear(parseInt(year))
    setStep('mes')
  }

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(parseInt(month))
    setStep('dia')
  }

  const handleDaySelect = (day: string) => {
    setSelectedDay(parseInt(day))
    setStep('display')
  }

  const resetSelection = () => {
    setSelectedYear(null)
    setSelectedMonth(null)
    setSelectedDay(null)
    setStep('año')
  }

  const goBack = () => {
    if (step === 'mes') {
      setStep('año')
      setSelectedMonth(null)
    } else if (step === 'dia') {
      setStep('mes')
      setSelectedDay(null)
    } else if (step === 'display') {
      setStep('dia')
    }
  }

  return (
    <div className='w-[29rem] p-4 border rounded-lg shadow-lg bg-background'>
      {step === 'año' && <YearPicker onSelect={handleYearSelect} />}
      {step === 'mes' && <MonthPicker onSelect={handleMonthSelect} />}
      {step === 'dia' && (
        <DayPicker
          onSelect={handleDaySelect}
          year={selectedYear!}
          month={selectedMonth!}
        />
      )}
      {step === 'display' && (
        <DateDisplay
          year={selectedYear!}
          month={selectedMonth!}
          day={selectedDay!}
          onReset={resetSelection}
          onChange={onChange}
          setOpenDatePicker={setOpenDatePicker}
        />
      )}
      {step !== 'año' && (
        <Button
          variant='ghost'
          size='sm'
          onClick={goBack}
          className='mt-2'>
          <ChevronLeft className='mr-2 h-4 w-4' />
          Atras
        </Button>
      )}
    </div>
  )
}

const YearPicker = ({ onSelect }: { onSelect: (year: string) => void }) => {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger>
        <SelectValue placeholder='Selecciona un año' />
      </SelectTrigger>
      <SelectContent className='w-full'>
        {years.map((year) => (
          <SelectItem
            key={year}
            value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

const MonthPicker = ({ onSelect }: { onSelect: (month: string) => void }) => {
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]

  return (
    <Select onValueChange={(value) => onSelect((months.indexOf(value) + 1).toString())}>
      <SelectTrigger>
        <SelectValue placeholder='Selecciona un mes' />
      </SelectTrigger>
      <SelectContent className='w-full'>
        {months.map((month, index) => (
          <SelectItem
            key={index}
            value={month}>
            {month}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

const DayPicker = ({
  onSelect,
  year,
  month
}: {
  onSelect: (day: string) => void
  year: number
  month: number
}) => {
  const daysInMonth = new Date(year, month, 0).getDate()
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger>
        <SelectValue placeholder='Selecciona un día' />
      </SelectTrigger>
      <SelectContent className='w-full'>
        {days.map((day) => (
          <SelectItem
            key={day}
            value={day.toString()}>
            {day}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

const DateDisplay = ({
  year,
  month,
  day,
  onReset,
  onChange,
  setOpenDatePicker
}: {
  year: number
  month: number
  day: number
  onReset: () => void
  onChange: (value: string) => void
  setOpenDatePicker: Dispatch<SetStateAction<boolean>>
}) => {
  const formattedDate = new Date(year, month - 1, day).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const handleDateChange = () => {
    onChange(new Date(year, month - 1, day).toISOString())
    setOpenDatePicker(false)
  }
  return (
    <div className='text-center'>
      <p className='mb-2'>Fecha seleccionada:</p>
      <p className='text-lg font-semibold mb-4'>{formattedDate}</p>
      <div className='gap-6 flex justify-center'>
        <Button onClick={onReset}>
          Cambiar fecha
          <ChevronRight className='ml-2 h-4 w-4' />
        </Button>
        <Button onClick={handleDateChange}>
          Guardar fecha <CheckIcon className='ml-2 h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}
