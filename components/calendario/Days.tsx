import dayjs from 'dayjs'
interface Props {
  day: dayjs.Dayjs
  rowIdx: number
}

export const Days = ({ day, rowIdx }: Props) => {
  return (
    <div className='flex flex-col border border-gray-200'>
      <header className='flex flex-col items-center'>
        {rowIdx === 0 && (
          <p className='mt-1 text-sm'>{day.format('ddd').toUpperCase()}</p>
        )}
        <p className='text-sm p-1 my-1 text-center'>{day.format('DD')}</p>
      </header>
    </div>
  )
}
