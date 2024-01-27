import Image from 'next/image'
import Link from 'next/link'

export const Navbar = () => {
  return (
    <nav className='flex bg-white p-2 m-2 rounded '>
      <Link href={'/'} className=''>
        <Image
          className='w-auto'
          src='/assets/logo_choyun-1.png'
          alt='logo-choyun'
          width={70}
          height={70}
        />
      </Link>
      <div className='flex flex-1'></div>
      <Link className='mr-2 text-black' href={'/somos'}>
        Somos
      </Link>
      <Link className='mr-2 text-black' href={'/presencial'}>
        Presencial
      </Link>
      <Link className='mr-2 text-black' href={'/enlinea'}>
        Conecta
      </Link>
      <Link className='mr-2 text-black' href={'/prensa'}>
        Prensa
      </Link>
      <Link className='mr-2 text-black' href={'/'}>
        Publicaiones
      </Link>
      <Link className='mr-2 text-black' href={'/'}>
        Quiero ayudar
      </Link>
    </nav>
  )
}
