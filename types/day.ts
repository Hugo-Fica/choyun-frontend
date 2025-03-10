import { BaseModel } from './global'
import { ScheduleMongo } from './schedule'

export type DayMogno = BaseModel & {
  day: string
  date: Date
  schedule: ScheduleMongo[]
}
export type CreateDayRequest = {
  day: string
  date: string | Date
}

export type UpdateDayRequest = {
  day?: string
  date?: string | Date
}
