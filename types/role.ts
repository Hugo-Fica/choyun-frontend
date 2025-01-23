export type Role = {
  id: string
  name: string
  description: string
}

export type RolesStore = {
  roles: Role[]
  setRoles: (roles: Role[]) => void
}
