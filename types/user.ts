export type User = {
  id: string
  email: string
  names: string
  lastnames: string
  birthday: string
  age: number
  phone: string
  role: string
  valid: boolean
}

export type NewUser = {
  email: string
  names: string
  lastnames: string
  age: number
  birthday: string
  phone: string
  role_id: string
}

export type UserStore = {
  users: User[]
  setUsers: (users: User[]) => void
}
