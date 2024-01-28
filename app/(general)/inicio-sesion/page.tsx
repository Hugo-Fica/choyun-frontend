'use client'
import { EyeClosedIcon, EyeIcon } from '@primer/octicons-react'
import Link from 'next/link'
import { useState } from 'react'

export default function InicioSesionPage() {
  const [pass, setPass] = useState(true)

  const verPass = () => {
    setPass(!pass)
  }

  return (
    <>
      <div
        className='flex items-center justify-center h-full  flex-col w-[380px] px-[50px] py-[50px] pb-[50px] shadow-md shadow-gray-400 rounded-[20px]
      gap-[20px]
      '
      >
        <form action='' className='relative w-full flex flex-col gap-[20px]'>
          <h2 className='text-[2em] mb-[30px] leading-[0.9em] text-center'>
            Iniciar sesión
          </h2>
          <input
            type='text'
            className='border-none outline-none bg-transparent rounded-[10px] text-[1em] w-full px-[20px] py-[20px] pl-[40px] shadow-inner bg-gradient-to-br from-gray-50 to-white'
            placeholder='Correo'
          />
          <div className='relative'>
            <input
              type={pass ? 'password' : 'text'}
              className='border-none outline-none bg-transparent rounded-[10px] text-[1em] w-full px-[20px] py-[20px] pl-[40px] shadow-inner bg-gradient-to-br from-gray-50 to-white'
              placeholder='Contraseña'
            />

            <button
              type='button'
              onClick={verPass}
              className='absolute right-0 translate-y-[20px] -translate-x-[20px]'
            >
              {pass ? (
                <EyeIcon size={24} className='fill-gray-700' />
              ) : (
                <EyeClosedIcon size={24} className='fill-gray-700' />
              )}
            </button>
          </div>
          <div className='flex flex-row w-full justify-between'>
            <Link href={'/crear-cuenta'}>
              <span className='text-left text-[12px] pl-[15px] text-gray-600'>
                Crear Cuenta
              </span>
            </Link>
            <Link href={'/'}>
              <span className='text-right text-[12px] pr-[15px] text-gray-600'>
                Recuperar contraseña
              </span>
            </Link>
          </div>
          <button className='mt-[20px] shadow-md shadow-gray-400 w-full px-[15px] py-[20px] cursor-pointer font-semibold rounded-[20px] focus:shadow-inner focus:bg-gradient-to-br focus:from-gray-50 focus:to-white'>
            Iniciar sesión
          </button>
        </form>
      </div>
    </>
  )
}
