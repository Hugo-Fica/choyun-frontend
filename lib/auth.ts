import jwt from 'jsonwebtoken'

export const generarToken = (user_id: string, role_id: string) => {
  const token = jwt.sign({ user_id, role_id }, process.env.SECRET_KEY!, { expiresIn: '7d' })
  return token
}
