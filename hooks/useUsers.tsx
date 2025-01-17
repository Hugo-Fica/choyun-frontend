import { User } from '@/types/user'
import axios from 'axios'

export const useUsers = () => {
  const getUsers = async () => {
    const { data } = await axios.get('/api/protected/users')

    return data.usuarios as User[]
  }
  return { getUsers }
}
