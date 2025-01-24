import { User, UserStore } from '@/types/user'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => {
        return {
          users: [],
          setUsers: (users: User[]) => {
            set({ users }, false, 'SET_USERS')
          }
        }
      },
      {
        name: 'user-store'
      }
    )
  )
)
