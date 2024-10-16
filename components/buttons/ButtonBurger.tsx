'use client'

import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useState,
} from 'react'
import { motion } from 'framer-motion'
import { linksNavigate } from '@/helpers/links-navigate'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'

export const ButtonBurger = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='relative'>
      {/* Burger Button */}
      <button
        onClick={toggleMenu}
        className='z-50 relative flex items-center justify-center w-10 h-10 focus:outline-none'
      >
        <motion.div
          initial='closed'
          animate={isOpen ? 'open' : 'closed'}
          className='flex flex-col justify-between w-6 h-6'
        >
          {/* Top Line */}
          <motion.span
            className='block h-0.5 bg-black'
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: 45, y: 11 },
            }}
            transition={{ duration: 0.3 }}
          />
          {/* Middle Line */}
          <motion.span
            className='block h-0.5 bg-black'
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            transition={{ duration: 0.3 }}
          />
          {/* Bottom Line */}
          <motion.span
            className='block h-0.5 bg-black'
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: -45, y: -11 },
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </button>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={
          isOpen
            ? { maxHeight: '600px', opacity: 1, height: 'auto' }
            : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.5 }}
        className='absolute top-[51px] right-0 w-[200px] text-xs bg-white text-black overflow-hidden shadow-xl'
      >
        {linksNavigate.map((links) => (
          <Accordion type='single' collapsible key={links.title}>
            <AccordionItem value={links.title}>
              <AccordionTrigger className='pl-[20px]'>
                {links.title}
              </AccordionTrigger>
              {links.subLinks.map((sub) => (
                <ListItem key={sub.title} href={sub.href}>
                  {sub.title}
                </ListItem>
              ))}
            </AccordionItem>
          </Accordion>
        ))}
      </motion.div>
    </div>
  )
}

const ListItem = forwardRef<ElementRef<'a'>, ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, href = '/', ...props }, ref) => {
    return (
      <li>
        <AccordionContent asChild>
          <Link
            ref={ref}
            href={href}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <p className='line-clamp-2 text-xs md:text-sm leading-snug text-muted-foreground'>
              {children}
            </p>
          </Link>
        </AccordionContent>
      </li>
    )
  }
)

ListItem.displayName = 'ListItem'
