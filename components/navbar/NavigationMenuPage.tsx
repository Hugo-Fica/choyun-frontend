'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { linksNavigate } from '@/helpers/links-navigate'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { ButtonBurger } from '../buttons/ButtonBurger'

export function NavigationMenuPage() {
  return (
    <NavigationMenu className='bg-white fixed top-0 w-full z-10 shadow-md'>
      {/* Mobile Navbar (visible on small screens) */}
      <NavigationMenuList className='flex justify-between items-center px-4 lg:px-12 md:hidden'>
        <div className='flex items-center'>
          <NavigationMenuItem className='h-16 flex items-center'>
            <Link href={'/'} legacyBehavior>
              <Image
                className='w-[200px] pl-[25px]'
                src='/assets/logo_choyun-1.png'
                alt='logo-choyun'
                width={80}
                height={80}
              />
            </Link>
          </NavigationMenuItem>
        </div>
        {/* Simple icon or button for mobile menu */}
        <div className='flex items-center w-screen justify-end pr-[25px]'>
          <ButtonBurger />
        </div>
      </NavigationMenuList>

      {/* Desktop Navbar (visible on medium and larger screens) */}
      <NavigationMenuList className='hidden md:flex w-screen justify-between items-center px-2 sm:px-4 lg:px-12'>
        <div className='flex items-center'>
          <NavigationMenuItem className='h-16 flex items-center'>
            <Link href={'/'} legacyBehavior>
              <Image
                className='w-[80px] sm:w-[100px] md:w-[150px] lg:w-[200px]'
                src='/assets/logo_choyun-1.png'
                alt='logo-choyun'
                width={200}
                height={100}
              />
            </Link>
          </NavigationMenuItem>
        </div>
        <div className='flex items-center'>
          {linksNavigate.map((link) => (
            <NavigationMenuItem
              key={link.title}
              className='flex items-center px-2'
            >
              <NavigationMenuTrigger className='md:text-base text-xs'>
                {link.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid w-[250px] gap-3 p-4 md:w-[310px] grid-cols-1 lg:w-[350px] transition-all'>
                  {link.subLinks.map((sub) => (
                    <ListItem
                      key={sub.href}
                      href={sub.href}
                      className='text-black hover:text-gray-700 text-sm'
                    >
                      {sub.title}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = forwardRef<ElementRef<'a'>, ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, href = '/', ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
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
        </NavigationMenuLink>
      </li>
    )
  }
)

ListItem.displayName = 'ListItem'