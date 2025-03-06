import jwt from 'jsonwebtoken'

export const generarToken = (user_id: string, role_id: string, exp: '1s' | '300s' | '7d') => {
  const token = jwt.sign({ user_id, role_id }, process.env.SECRET_KEY!, { expiresIn: exp })
  return token
}

export const validarToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as {
      user_id: string
      role_id: string
    }
    return decoded
  } catch (error) {
    return null
  }
}
