import { type User, type UserAuthStore } from '@/types/auth'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const useUserAuthStore = create<UserAuthStore>()(
  devtools(
    persist(
      (set) => {
        return {
          exp: 0,
          user_id: '',
          role_id: '',
          user: null,
          setUser: (user: User | null) => {
            set({ user }, false, 'GET_USER')
          },
          setValidated: (exp: number, user_id: string, role_id: string) => {
            set({ exp, user_id, role_id }, false, 'SET_VALIDATED')
          }
        }
      },
      {
        name: 'user-store'
      }
    )
  )
)
