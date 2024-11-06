export type UserLogin = {
  email: string
  password: string
}

export type User = {
  email: string
  names: string
  lastnames: string
  birthday: string
  age: number
  phone: string
  role: string
}

export type UserStore = {
  exp: number
  user_id: string
  role_id: string
  user: User | null
  setUser: (user: User | null) => void
}
