import { Role } from '@/types/role'
import axios from 'axios'

export const useRoles = () => {
  const getRoles = async () => {
    const { data } = await axios.get('/api/protected/roles')

    return data.roles as Role[]
  }
  return { getRoles }
}
