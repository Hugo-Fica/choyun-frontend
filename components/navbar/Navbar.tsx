"use client";
import { useState } from 'react';
import { PersonIcon, SearchIcon } from '@primer/octicons-react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaYoutube, FaBars } from 'react-icons/fa';

// Definición del tipo para los enlaces
type LinkType = {
  path: string;
  text: string;
};

// Array de enlaces con el tipo definido
const links: LinkType[] = [
  { path: '/somos', text: 'Somos' },
  { path: '/presencial', text: 'Presencial' },
  { path: '/en-linea', text: 'Conecta' },
  { path: '/prensa', text: 'Prensa' },
  { path: '/', text: 'Publicaciones' },
  { path: '/', text: 'Quiero ayudar' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='bg-white px-4 sm:px-6 lg:px-24 fixed top-0 w-full z-10 shadow-md'>
      <div className='flex items-center justify-between h-16'>
        <Link href={'/'} className='flex items-center' legacyBehavior>
          <a>
            <Image
              className='w-auto pb-[10px]'
              src='/assets/logo_choyun-1.png'
              alt='logo-choyun'
              width={50}
              height={50}
            />
          </a>
        </Link>
        <div className='flex space-x-4 lg:hidden'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='text-black hover:text-gray-700 focus:outline-none focus:text-gray-700'
          >
            <FaBars size={24} />
          </button>
        </div>
        <div className='hidden lg:flex lg:items-center lg:space-x-6'>
          {links.map((link: LinkType) => (
            <Link href={link.path} key={link.text} legacyBehavior>
              <a className="text-black hover:text-gray-700">{link.text}</a>
            </Link>
          ))}
          <div className='flex items-center'>
            <SearchIcon size={24} className='fill-black mx-4' />
          </div>
          <Link href={'/inicio-sesion'} className='flex items-center' legacyBehavior>
            <a>
              <PersonIcon size={24} className='fill-black' />
            </a>
          </Link>
          <div className='flex space-x-4 ml-4'>
            <Link href='https://web.facebook.com/fundacionchoyun?locale=es_LA' aria-label='Facebook' legacyBehavior>
              <a>
                <FaFacebook size={24} className='text-black' />
              </a>
            </Link>
            <Link href='https://www.youtube.com/@fundacionchoyun6663' aria-label='YouTube' legacyBehavior>
              <a>
                <FaYoutube size={24} className='text-black' />
              </a>
            </Link>
            <Link href='https://www.instagram.com/fundacion.choyun/?hl=es' aria-label='Instagram' legacyBehavior>
              <a>
                <FaInstagram size={24} className='text-black' />
              </a>
            </Link>
          </div>
        </div>
      </div>
      {/* Menú desplegable para móviles */}
      {isOpen && (
        <div className='lg:hidden'>
          <div className='flex flex-col space-y-1 px-2 pt-2 pb-3'>
            {links.map((link: LinkType) => (
              <Link href={link.path} key={link.text} legacyBehavior>
                <a className="text-black hover:text-gray-700">{link.text}</a>
              </Link>
            ))}
            <div className='flex items-center justify-between'>
              <SearchIcon size={24} className='fill-black mx-4' />
              <Link href={'/inicio-sesion'} className='flex items-center' legacyBehavior>
                <a>
                  <PersonIcon size={24} className='fill-black' />
                </a>
              </Link>
            </div>
            <div className='flex space-x-4 mt-4'>
              <Link href='https://web.facebook.com/fundacionchoyun?locale=es_LA' aria-label='Facebook' legacyBehavior>
                <a>
                  <FaFacebook size={24} className='text-black' />
                </a>
              </Link>
              <Link href='https://www.youtube.com/@fundacionchoyun6663' aria-label='YouTube' legacyBehavior>
                <a>
                  <FaYoutube size={24} className='text-black' />
                </a>
              </Link>
              <Link href='https://www.instagram.com/fundacion.choyun/?hl=es' aria-label='Instagram' legacyBehavior>
                <a>
                  <FaInstagram size={24} className='text-black' />
                </a>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
