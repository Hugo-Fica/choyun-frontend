import { BaseModel } from './global'
import { ScheduleMongo } from './schedule'
import { StudentInClassMongo } from './student'
import { TeacherInClassMogno } from './teacher'

export type ClassMogno = BaseModel & {
  name: string
  description?: string | null
  scheduleIds: string[]
  schedules: ScheduleMongo[]
  teacherUsers: TeacherInClassMogno[]
  studentUsers: StudentInClassMongo[]
}

export type CreateClassRequest = {
  name: string
  description?: string
  scheduleIds?: string[]
}

export type UpdateClassRequest = {
  name?: string
  description?: string
  scheduleIds?: string[]
}
