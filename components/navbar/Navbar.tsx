import { PersonIcon, SearchIcon } from '@primer/octicons-react'
import Image from 'next/image'
import Link from 'next/link'

export const Navbar = () => {
  return (
    <nav className='flex bg-white  rounded px-[300px] items-center'>
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
      <Link className='mr-2 text-black flex items-center' href={'/somos'}>
        <span>Somos</span>
      </Link>
      <div className='border-l-[1px] border-black mx-[16px] h-[25px]' />
      <Link className='mr-2 text-black flex items-center ' href={'/presencial'}>
        <span>Presencial</span>
      </Link>
      <div className='border-l-[1px] border-black mx-[16px] h-[25px]' />
      <Link className='mr-2 text-black flex items-center ' href={'/en-linea'}>
        <span>Conecta</span>
      </Link>
      <div className='border-l-[1px] border-black mx-[16px] h-[25px]' />
      <Link className='mr-2 text-black flex items-center ' href={'/prensa'}>
        <span>Prensa</span>
      </Link>
      <div className='border-l-[1px] border-black mx-[16px] h-[25px]' />

      <Link className='mr-2 text-black flex items-center ' href={'/'}>
        <span>Publicaiones</span>
      </Link>
      <div className='border-l-[1px] border-black mx-[16px] h-[25px]' />
      <Link className='mr-2 text-black flex items-center ' href={'/'}>
        <span>Quiero ayudar</span>
      </Link>
      <div className='flex items-center'>
        <SearchIcon size={24} className='fill-black mx-[16px]' />
      </div>
      <div className='flex items-center'>
        <PersonIcon size={24} className='fill-black' />
      </div>
      <div className='border-l-[1px] border-black mx-[16px] h-[80px]' />
      <span className='text-black'>logos redes sociales</span>
    </nav>
  )
}
