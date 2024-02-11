import dayjs from 'dayjs'

interface Props {
  day: dayjs.Dayjs
  rowIdx: number
}

export const Days = ({ day, rowIdx }: Props) => {
  const getCurrentDay = () => {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'bg-blue-600 text-white rounded-full w-7 '
      : ''
  }
  return (
    <div className={` flex flex-col border border-gray-200 rounded-[5px]`}>
      <header className='flex flex-col items-center'>
        {rowIdx === 0 && (
          <p className='mt-1 text-sm'>{day.format('dddd').toUpperCase()}</p>
        )}
        <p className={`${getCurrentDay()} text-sm p-1 my-1 text-center`}>
          {day.format('DD')}
        </p>
      </header>
    </div>
  )
}
