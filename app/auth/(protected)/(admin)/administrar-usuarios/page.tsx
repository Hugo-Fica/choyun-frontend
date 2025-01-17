import { CreateUserModal } from '@/components/administrar-usuarios/CreateUserModal'
import { UserAdminTable } from '@/components/administrar-usuarios/UserAdminTable'

export default function AdministrarUsuarios() {
  return (
    <>
      <CreateUserModal />
      <UserAdminTable />
    </>
  )
}
