import { PersonIcon, SearchIcon } from '@primer/octicons-react'
import Image from 'next/image'
import Link from 'next/link'
import { NavLink } from '..'

const links = [
  { path: '/somos', text: 'Somos' },
  { path: '/presencial', text: 'Presencial' },
  { path: '/en-linea', text: 'Conecta' },
  { path: '/prensa', text: 'Prensa' },
  { path: '/', text: 'Publicaciones' },
  { path: '/', text: 'Quiero ayudar' },
]
export const Navbar = () => {
  return (
    <nav className='flex bg-white px-[300px] items-center fixed top-0 w-full z-10'>
      <Link href={'/'} className='flex items-center '>
        <Image
          className='w-auto pb-[10px]'
          src='/assets/logo_choyun-1.png'
          alt='logo-choyun'
          width={70}
          height={70}
        />
      </Link>
      <div className='flex flex-1 '></div>
      {links.map((link) => (
        <NavLink key={link.text} {...link} />
      ))}
      <div className='flex items-center'>
        <SearchIcon size={24} className='fill-black mx-[16px]' />
      </div>
      <div className='border-l-[1px] border-black mx-[16px] h-[25px] border-opacity-30' />

      <Link href={'/inicio-sesion'} className='flex items-center'>
        <PersonIcon size={24} className='fill-black' />
      </Link>
      <div className='border-l-[1px] border-black mx-[16px] h-[80px] border-opacity-30' />
      <span className='text-black'>logos redes sociales</span>
    </nav>
  )
}
