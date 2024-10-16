import { type LinkType } from '@/types/links'

export const linksNavigate: LinkType[] = [
  {
    title: 'Labor',
    subLinks: [
      { title: 'Semillero artístico', href: 'labor/semillero-artistico' },
      { title: 'Semillero musical', href: 'labor/semillero-musical' },
      { title: 'Yoga y ubound', href: 'labor/yoga-y-ubound' },
      { title: 'Arpillera creativa', href: 'labor/arpillera-creativa' },
      { title: 'Crianza respetuosa', href: 'labor/crianza-respetuosa' },
    ],
  },
  {
    title: 'Causa',
    subLinks: [
      {
        title: 'Biblioteca libre Nazarena Jerónimo',
        href: 'causa/biblioteca-libre-nazarena-jeronimo',
      },
      {
        title: 'Salidas pedagógicas',
        href: 'causa/salidas-pedagogicas',
      },
      { title: 'Visitas artísticas', href: 'causa/visitas-artisticas' },
      {
        title: 'Acopio de materiales artísticos',
        href: 'causa/acopio-materiales-artisticos',
      },
      { title: 'Recolección de tapitas', href: 'causa/recoleccion-tapitas' },
      { title: 'Sala de ensayos', href: 'causa/sala-de-ensayos' },
    ],
  },
  {
    title: 'Súmate',
    subLinks: [
      { title: 'Voluntarixs', href: 'sumate/voluntarixs' },
      { title: 'Tienda solidaria', href: 'sumate/tienda-solidaria' },
      { title: 'Dona', href: 'sumate/dona' },
    ],
  },
]
