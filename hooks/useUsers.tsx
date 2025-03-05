import { NewUser, User } from '@/types/user'
import axios from 'axios'

export const useUsers = () => {
  const getUsers = async () => {
    const { data } = await axios.get('/api/protected/users')
    return data.usuarios as User[]
  }
  const getUser = async (user_id: string) => {
    const { data } = await axios.get(`/api/protected/users/${user_id}`)

    return data
  }
  const postUser = async (user: NewUser) => {
    const { data } = await axios.post('/api/protected/users', user)

    return data as {
      message: string
      otp: { code: string; expiresAt: Date; user_id: string; token: string }
    }
  }
  const putUser = async (user: User) => {
    const { data } = await axios.put(`/api/protected/users`, user)

    return data
  }
  const deleteUser = async (user_id: string) => {
    const { data } = await axios.delete(`/api/protected/users/${user_id}`)

    return data
  }

  return { getUsers, getUser, postUser, putUser, deleteUser }
}
