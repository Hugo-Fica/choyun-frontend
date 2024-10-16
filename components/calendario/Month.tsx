import dayjs from 'dayjs'
import { Fragment } from 'react'
import 'dayjs/locale/es'
import { Days } from './Days'
interface Props {
  month: dayjs.Dayjs[][]
}
export const Month = ({ month }: Props) => {
  return (
    <div className='grid grid-cols-7 grid-rows-5 w-[900px] h-[600px]'>
      {month.map((row, i) => (
        <Fragment key={i}>
          {row.map((day, idx) => (
            <Days day={day.locale('es')} key={idx} rowIdx={i} />
          ))}
        </Fragment>
      ))}
    </div>
  )
}
