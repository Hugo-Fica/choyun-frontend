import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Footer, Navbar } from '@/components'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fundación Choyun - El Salvador',
  description: '',
  icons: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es'>
      <body className={inter.className}>
        <div className='flex flex-col min-h-screen'>
          <Navbar />
          <main className='flex-grow'>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
