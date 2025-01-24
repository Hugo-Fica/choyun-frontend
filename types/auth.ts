import { UserRole } from './links'

export type UserLogin = {
  email: string
  password: string
}

export type User = {
  id: string
  email: string
  names: string
  lastnames: string
  birthday: string
  age: number
  phone: string
  role: UserRole
}

export type UserAuthStore = {
  exp: number
  user_id: string
  role_id: string
  user: User | null
  setUser: (user: User | null) => void
  setValidated: (exp: number, user_id: string, role_id: string) => void
}
