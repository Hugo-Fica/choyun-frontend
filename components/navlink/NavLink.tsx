'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
interface Props {
  path: string
  text: string
}
export const NavLink = ({ path, text }: Props) => {
  const pathName = usePathname()
  return (
    <>
      <Link
        className={`mr-2  flex items-center transition-all hover:text-black hover:font-medium ${
          pathName === path ? 'text-black font-medium' : 'text-gray-500'
        }`}
        href={path}
      >
        <span>{text}</span>
      </Link>
      <div className='border-l-[1px] border-black mx-[16px] h-[25px] border-opacity-30' />
    </>
  )
}
