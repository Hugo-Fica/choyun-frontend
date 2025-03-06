'use client'
import jwt from 'jsonwebtoken'

export const validarTokenClient = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY!) as {
      user_id: string
      role_id: string
    }
    return decoded
  } catch (error) {
    return null
  }
}
