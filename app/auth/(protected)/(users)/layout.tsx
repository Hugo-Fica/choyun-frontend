import React from 'react'
export default function AuthUserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className='bg-cyan-400'>{children}</main>
    </>
  )
}
