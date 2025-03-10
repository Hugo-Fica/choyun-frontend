import { BaseModel } from './global'
import { DayMogno } from './day'
import { StudentInClassMongo } from './student'

export type ScheduleMongo = BaseModel & {
  startTime: string
  endTime: string
  dayId: string
  day: DayMogno
  classIds: string[]
  classes: StudentInClassMongo[]
}
export type CreateScheduleRequest = {
  startTime: string
  endTime: string
  dayId: string
  classIds?: string[]
}

export type UpdateScheduleRequest = {
  startTime?: string
  endTime?: string
  dayId?: string
  classIds?: string[]
}
