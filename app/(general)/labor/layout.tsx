import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre Nosotros - Fundación Choyün',
  description:
    'Conoce más sobre la Fundación Choyün, nuestra misión y visión, y cómo trabajamos para promover la cultura y las artes en Chile.',
  keywords: [
    'Fundación Choyün',
    'sobre nosotros',
    'misión',
    'visión',
    'arte',
    'cultura',
    'Chile',
    'El Salvador',
    'talleres artísticos',
    'educación artística',
    'revitalización cultural'
  ],
  robots: 'index, follow',
  openGraph: {
    title: 'Sobre Nosotros - Fundación Choyün',
    description:
      'Descubre la historia y la misión de la Fundación Choyün, una organización dedicada a revitalizar la cultura y las artes en Chile.',
    url: 'https://www.fundacionchoyun.cl/sobre-nosotros',
    images: [
      {
        url: 'https://drive.google.com/uc?export=view&id=1nim2jqyBBkETr09bEjvgOZ9huuIKqXFm',
        width: 800,
        height: 600,
        alt: 'Fundación Choyün - Arte y Cultura en Chile'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre Nosotros - Fundación Choyün',
    description:
      'Conoce más sobre la Fundación Choyün y cómo promovemos la cultura y las artes en Chile.',
    images: ['https://drive.google.com/uc?export=view&id=1nim2jqyBBkETr09bEjvgOZ9huuIKqXFm']
  },
  alternates: {
    canonical: 'https://www.fundacionchoyun.cl/sobre-nosotros'
  }
}

export default function SomosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
