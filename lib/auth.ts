import jwt from 'jsonwebtoken'

export const generarToken = (user_id: string, role_id: string, exp: '1s' | '7d') => {
  const token = jwt.sign({ user_id, role_id }, process.env.SECRET_KEY!, { expiresIn: exp })
  return token
}
