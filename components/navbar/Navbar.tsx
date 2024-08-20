"use client";

import { useState } from 'react';
import { PersonIcon, SearchIcon } from '@primer/octicons-react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaYoutube, FaBars } from 'react-icons/fa';

type LinkType = {
  path: string;
  text: string;
};

const links: LinkType[] = [
  { path: '/somos', text: 'Sobre Nosotros' },
  { path: '/presencial', text: 'Lo que valoro - Filosofía y visión' },
  { path: '/en-linea', text: 'Contenido educativo – blog' },
  { path: '/prensa', text: 'Biblioteca libre' },
  { path: '/', text: 'Donaciones' },
  { path: '/', text: 'Contáctenos' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='bg-white px-2 sm:px-4 lg:px-12 fixed top-0 w-full z-10 shadow-md'>
      <div className='flex items-center justify-between h-16'>
        <Link href={'/'} className='flex items-center' legacyBehavior>
          <a>
            <Image
              className='w-auto pb-[20px]'
              src='/assets/logo_choyun-1.png'
              alt='logo-choyun'
              width={100}
              height={100}
              // className='sm:w-50 sm:h-50 lg:w-70 lg:h-70'
            />
          </a>
        </Link>
        <div className='flex space-x-2 lg:hidden'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='text-black hover:text-gray-700 focus:outline-none focus:text-gray-700'
          >
            <FaBars size={24} />
          </button>
        </div>
        <div className='hidden lg:flex lg:items-center lg:space-x-4'>
          {links.map((link: LinkType) => (
            <Link href={link.path} key={link.text} legacyBehavior>
              <a className="text-black hover:text-gray-700 text-sm lg:text-base">{link.text}</a>
            </Link>
          ))}
          <div className='flex items-center'>
            <SearchIcon size={20} className='fill-black mx-2' />
          </div>
          <Link href={'/inicio-sesion'} className='flex items-center' legacyBehavior>
            <a>
              <PersonIcon size={20} className='fill-black' />
            </a>
          </Link>
          <div className='flex space-x-2 ml-2'>
            <Link href='https://web.facebook.com/fundacionchoyun?locale=es_LA' aria-label='Facebook' legacyBehavior>
              <a>
                <FaFacebook size={20} className='text-black' />
              </a>
            </Link>
            <Link href='https://www.youtube.com/@fundacionchoyun6663' aria-label='YouTube' legacyBehavior>
              <a>
                <FaYoutube size={20} className='text-black' />
              </a>
            </Link>
            <Link href='https://www.instagram.com/fundacion.choyun/?hl=es' aria-label='Instagram' legacyBehavior>
              <a>
                <FaInstagram size={20} className='text-black' />
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
                <a className="text-black hover:text-gray-700 text-sm">{link.text}</a>
              </Link>
            ))}
            <div className='flex items-center justify-between mt-2'>
              <SearchIcon size={20} className='fill-black mx-2' />
              <Link href={'/inicio-sesion'} className='flex items-center' legacyBehavior>
                <a>
                  <PersonIcon size={20} className='fill-black' />
                </a>
              </Link>
            </div>
            <div className='flex space-x-2 mt-4'>
              <Link href='https://web.facebook.com/fundacionchoyun?locale=es_LA' aria-label='Facebook' legacyBehavior>
                <a>
                  <FaFacebook size={20} className='text-black' />
                </a>
              </Link>
              <Link href='https://www.youtube.com/@fundacionchoyun6663' aria-label='YouTube' legacyBehavior>
                <a>
                  <FaYoutube size={20} className='text-black' />
                </a>
              </Link>
              <Link href='https://www.instagram.com/fundacion.choyun/?hl=es' aria-label='Instagram' legacyBehavior>
                <a>
                  <FaInstagram size={20} className='text-black' />
                </a>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
