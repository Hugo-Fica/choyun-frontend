import { InputPass } from '@/components/input-pass/InputPass'
import Link from 'next/link'
export default function CrearCuenta() {
  return (
    <>
      <div
        className='flex transition-all items-center justify-center h-full  flex-col w-[680px] px-[50px] py-[50px] pb-[50px] shadow-md shadow-gray-400 rounded-[20px]
      gap-[20px]
      '
      >
        <form action='' className='relative w-full flex flex-col gap-[20px]'>
          <h2 className='text-[2em] mb-[30px] leading-[0.9em] text-center'>
            Crear cuenta
          </h2>
          <div className='flex flex-row gap-[20px]'>
            <input
              type='text'
              className='border-none outline-none bg-transparent rounded-[10px] text-[1em] w-full px-[20px] py-[20px] pl-[40px] shadow-inner bg-gradient-to-br from-gray-50 to-white'
              placeholder='Nombres'
            />
            <input
              type='text'
              className='border-none outline-none bg-transparent rounded-[10px] text-[1em] w-full px-[20px] py-[20px] pl-[40px] shadow-inner bg-gradient-to-br from-gray-50 to-white'
              placeholder='Apellidos'
            />
          </div>
          <div className='flex flex-col gap-y-[20px] mt-[20px]'>
            <input
              type='text'
              className='border-none outline-none bg-transparent rounded-[10px] text-[1em] w-full px-[20px] py-[20px] pl-[40px] shadow-inner bg-gradient-to-br from-gray-50 to-white'
              placeholder='Correo'
            />
            <InputPass />
          </div>
          <div>
            <span className='text-left text-[12px] pl-[15px] text-gray-600'>
              Si tienes cuenta puedes,{' '}
            </span>
            <Link href={'/inicio-sesion'}>
              <span className='text-left text-[12px]  text-black'>
                Iniciar sesión
              </span>
            </Link>
          </div>
          <button className='mt-[20px] shadow-md shadow-gray-400 w-full px-[15px] py-[20px] cursor-pointer font-semibold rounded-[20px] focus:shadow-inner focus:bg-gradient-to-br focus:from-gray-50 focus:to-white'>
            Crear cuenta
          </button>
        </form>
      </div>
    </>
  )
}
