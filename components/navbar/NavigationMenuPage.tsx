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

export function NavigationMenuPage() {
  return (
    <NavigationMenu className='bg-white fixed top-0 w-full z-10 shadow-md'>
      <NavigationMenuList className='w-screen flex justify-between items-center px-2 sm:px-4 lg:px-12'>
        <div className='flex items-center'>
          <NavigationMenuItem className='h-16 flex items-center'>
            <Link href={'/'} legacyBehavior>
              <a>
                <Image
                  className='w-auto pb-[10px]'
                  src='/assets/logo_choyun-1.png'
                  alt='logo-choyun'
                  width={100}
                  height={100}
                />
              </a>
            </Link>
          </NavigationMenuItem>
        </div>
        <div className='flex items-center'>
          {linksNavigate.map((link) => (
            <NavigationMenuItem
              key={link.title}
              className='flex items-center px-2 left-20'
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
