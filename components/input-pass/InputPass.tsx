'use client'
import { useState } from 'react'
import { EyeClosedIcon, EyeIcon } from '@primer/octicons-react'
export const InputPass = () => {
  const [pass, setPass] = useState(true)
  const verPass = () => {
    setPass(!pass)
  }
  return (
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
  )
}
