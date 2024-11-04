import { type User, type UserStore } from '@/types/auth'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const useUserStore = create<UserStore>()(
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
          }
        }
      },
      {
        name: 'user-store'
      }
    )
  )
)
