import { useEventosStore } from '@/store/eventosStore'
import { ChevronLeftIcon, ChevronRightIcon } from '@primer/octicons-react'
import dayjs from 'dayjs'
import Image from 'next/image'

export const CalendarioHeader = () => {
  const { monthIndex, setMonthIndex } = useEventosStore((state) => state)

  const handleMesSiguiente = () => {
    setMonthIndex(monthIndex + 1)
  }
  const handleMesAnterior = () => {
    setMonthIndex(monthIndex - 1)
  }
  const handleMesActual = () => {
    setMonthIndex(dayjs().month())
  }
  return (
    <header className='px-4 py-2 flex items-end gap-x-[20px]'>
      <div className='flex flex-col items-center'>
        <Image
          className='w-auto'
          src='/assets/LOGOTIPO_choyun_DEF-17-1030x887.png'
          alt='mini-logo'
          width={70}
          height={70}
        />
        <span className='text-xl -translate-y-[13px]'>Calendario de agendas</span>
      </div>
      <button
        className='-translate-y-[13px] border-[1px] rounded-[5px] border-gray-500 w-[100px] h-[40px]'
        onClick={handleMesActual}>
        <span className='text-2xl'>Hoy</span>
      </button>
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
      <span className='text-6xl -translate-y-[13px]'>
        {dayjs(new Date(dayjs().year(), monthIndex)).locale('es').format('MMMM YYYY')}
      </span>
    </header>
  )
}
