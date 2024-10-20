'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { linksNavigate } from '@/helpers/links-navigate'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Accordion, AccordionContent, AccordionTrigger } from '../ui/accordion'
import { AccordionItem } from '@radix-ui/react-accordion'

export const ButtonBurger = () => {
  const path = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Detectar clics fuera del menú
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuRef])

  return (
    <div
      ref={menuRef}
      className='relative'>
      {/* Burger Button */}
      <button
        onClick={toggleMenu}
        className='z-50 relative flex items-center justify-center w-10 h-10 focus:outline-none'>
        <motion.div
          initial='closed'
          animate={isOpen ? 'open' : 'closed'}
          className='flex flex-col justify-between w-6 h-6'>
          {/* Top Line */}
          <motion.span
            className='block h-0.5 bg-black'
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: 45, y: 11 }
            }}
            transition={{ duration: 0.3 }}
          />
          {/* Middle Line */}
          <motion.span
            className='block h-0.5 bg-black'
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 }
            }}
            transition={{ duration: 0.3 }}
          />
          {/* Bottom Line */}
          <motion.span
            className='block h-0.5 bg-black'
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: -45, y: -11 }
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </button>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={
          isOpen ? { maxHeight: '600px', opacity: 1, height: 'auto' } : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.5 }}
        className='absolute top-[51px] right-0 w-[200px] text-xs bg-white text-black overflow-hidden shadow-xl'>
        <Accordion
          type='single'
          collapsible>
          {linksNavigate.map((links) => (
            <AccordionItem
              value={links.title}
              key={links.title}>
              <AccordionTrigger className='pl-[20px]'>{links.title}</AccordionTrigger>
              {links.subLinks.map((sl) => (
                <AccordionContent
                  key={sl.title}
                  className={`${path === sl.href && 'bg-gray-300 text-black'} p-[15px]`}>
                  <Link
                    href={sl.href}
                    onClick={toggleMenu}>
                    {sl.title}
                  </Link>
                </AccordionContent>
              ))}
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  )
}
