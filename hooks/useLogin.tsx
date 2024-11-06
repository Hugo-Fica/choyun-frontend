import axios, { AxiosError } from 'axios'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { type User, type UserLogin } from '@/types/auth'

export default function useLogin() {
  const loginUser = async (
    user: UserLogin
  ): Promise<{
    validated: boolean
    user_id: string
    role_id: string
    message: string
    exp: number
  }> => {
    try {
      const { data } = await axios.post('/api/auth', user)
      const decodedToken = jwt.decode(data.token) as JwtPayload | null
      console.log(decodedToken)
      if (decodedToken && decodedToken.exp) {
        const tiempoActual = Date.now()
        const tiempoExpiracion = decodedToken.exp * 1000
        const tiempoRestante = tiempoExpiracion - tiempoActual

        return {
          validated: true,
          user_id: decodedToken.user_id,
          role_id: decodedToken.role_id,
          message: data.message,
          exp: tiempoRestante
        }
      }
      return {
        validated: false,
        user_id: '',
        role_id: '',
        message: 'Error al iniciar sesión',
        exp: 0
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>
      if (err.response && err.response.data && err.response.data.message) {
        return {
          validated: false,
          user_id: '',
          role_id: '',
          message: err.response.data.message,
          exp: 0
        }
      } else {
        return {
          validated: false,
          user_id: '',
          role_id: '',
          message: 'Error desconocido',
          exp: 0
        }
      }
    }
  }

  const getUser = async (user_id: string): Promise<{ user: User | null }> => {
    try {
      const { data } = await axios.get(`/api/protected/users/${user_id}`)
      if (!data) {
        return { user: null }
      }
      return {
        user: data
      }
    } catch (error) {
      console.log(error)
      return {
        user: null
      }
    }
  }
  return { loginUser, getUser }
}
