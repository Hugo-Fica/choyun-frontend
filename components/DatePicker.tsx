'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type DatePickerStep = 'year' | 'month' | 'day' | 'display'

export const DatePicker = () => {
  const [step, setStep] = useState<DatePickerStep>('year')
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const handleYearSelect = (year: string) => {
    setSelectedYear(parseInt(year))
    setStep('month')
  }

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(parseInt(month))
    setStep('day')
  }

  const handleDaySelect = (day: string) => {
    setSelectedDay(parseInt(day))
    setStep('display')
  }

  const resetSelection = () => {
    setSelectedYear(null)
    setSelectedMonth(null)
    setSelectedDay(null)
    setStep('year')
  }

  const goBack = () => {
    if (step === 'month') {
      setStep('year')
      setSelectedMonth(null)
    } else if (step === 'day') {
      setStep('month')
      setSelectedDay(null)
    } else if (step === 'display') {
      setStep('day')
    }
  }

  return (
    <div className='w-64 p-4 border rounded-lg shadow-lg bg-background'>
      {step === 'year' && <YearPicker onSelect={handleYearSelect} />}
      {step === 'month' && <MonthPicker onSelect={handleMonthSelect} />}
      {step === 'day' && (
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
        />
      )}
      {step !== 'year' && (
        <Button
          variant='ghost'
          size='sm'
          onClick={goBack}
          className='mt-2'>
          <ChevronLeft className='mr-2 h-4 w-4' />
          Back
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
        <SelectValue placeholder='Select Year' />
      </SelectTrigger>
      <SelectContent>
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
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  return (
    <Select onValueChange={(value) => onSelect((months.indexOf(value) + 1).toString())}>
      <SelectTrigger>
        <SelectValue placeholder='Select Month' />
      </SelectTrigger>
      <SelectContent>
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
        <SelectValue placeholder='Select Day' />
      </SelectTrigger>
      <SelectContent>
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
  onReset
}: {
  year: number
  month: number
  day: number
  onReset: () => void
}) => {
  const formattedDate = new Date(year, month - 1, day).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className='text-center'>
      <p className='mb-2'>Selected Date:</p>
      <p className='text-lg font-semibold mb-4'>{formattedDate}</p>
      <Button onClick={onReset}>
        Change Date
        <ChevronRight className='ml-2 h-4 w-4' />
      </Button>
    </div>
  )
}
