import { CrearEvento } from './CrearEvento'
import { MiniCalendario } from './MiniCalendario'

export const SidebarCalendario = () => {
  return (
    <aside>
      <CrearEvento />
      <MiniCalendario />
    </aside>
  )
}
