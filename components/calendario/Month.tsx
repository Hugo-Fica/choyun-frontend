import dayjs from 'dayjs'
import { Fragment } from 'react'
import { Days } from '..'

interface Props {
  month: dayjs.Dayjs[][]
}
export const Month = ({ month }: Props) => {
  return (
    <div className='grid flex-1 grid-cols-7 grid-rows-5'>
      {month.map((row, i) => (
        <Fragment key={i}>
          {row.map((day, idx) => (
            <Days day={day} key={idx} rowIdx={i} />
          ))}
        </Fragment>
      ))}
    </div>
  )
}
