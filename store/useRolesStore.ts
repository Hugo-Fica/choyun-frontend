import { RolesStore } from '@/types/role'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useRolesStore = create<RolesStore>()(
  persist(
    (set) => ({
      roles: [],
      setRoles: (roles) => set({ roles })
    }),
    {
      name: 'roles'
    }
  )
)
