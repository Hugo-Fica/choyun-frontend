import Link from 'next/link';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className='bg-white flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 lg:px-[300px] py-4 sm:py-0 border-t border-gray-200 h-auto sm:h-[50px]'>
      <span className='text-black text-opacity-35 text-sm sm:text-base text-center w-full sm:w-auto'>
        © Copyright - Fundación Choyun
      </span>
      <div className='flex items-center mt-2 sm:mt-0'>
        <span className='text-black text-opacity-35 text-sm sm:text-base mr-4'>
          Redes sociales
        </span>
        <div className='flex space-x-2'>
          <Link href='https://web.facebook.com/fundacionchoyun?locale=es_LA' aria-label='Facebook'>
            <FaFacebook size={20} className='text-black' />
          </Link>
          <Link href='https://www.youtube.com/@fundacionchoyun6663' aria-label='YouTube'>
            <FaYoutube size={20} className='text-black' />
          </Link>
          <Link href='https://www.instagram.com/fundacion.choyun/?hl=es' aria-label='Instagram'>
            <FaInstagram size={20} className='text-black' />
          </Link>
        </div>
      </div>
    </footer>
  );
};
