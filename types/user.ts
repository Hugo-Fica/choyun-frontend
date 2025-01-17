export type User = {
  id: string
  email: string
  names: string
  lastnames: string
  birthday: string
  age: number
  phone: string
  role: string
}

export type UserStore = {
  users: User[]
  setUsers: (users: User[]) => void
}
