'use client'
import Link from 'next/link'
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '../ui/navigation-menu'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { useUserStore } from '@/store/user-store'
import { linksNavigateAuth } from '@/helpers/links-navigate'
import { Button } from '../ui/button'

const routes = [
  { title: 'Crear cuenta', link: '/crear-cuenta' },
  { title: 'Iniciar sesión', link: '/inicio-sesion' }
]
export const ButtonUser = () => {
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)
  const path = usePathname()
  const logout = () => {
    setUser(null)
  }
  return (
    <NavigationMenuList className='hidden md:flex justify-between items-centers pr-10'>
      <div className='flex items-center'>
        <NavigationMenuItem className='flex items-center px-2'>
          <NavigationMenuTrigger className='md:text-base text-xs'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
              />
            </svg>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid w-[250px] gap-3 p-4 md:w-[310px] grid-cols-1 lg:w-[350px] transition-all'>
              {user !== null ? (
                <>
                  {linksNavigateAuth.map((l) => (
                    <ListItem
                      key={l.title}
                      href={l.url}
                      className={`${
                        path === l.url && 'bg-gray-300 text-black'
                      }  hover:text-gray-700 text-sm`}>
                      {l.title}
                    </ListItem>
                  ))}
                  <Button
                    className='bg-red-500 hover:bg-red-400 text-white hover:text-white'
                    onClick={logout}>
                    Cerrar sesión
                  </Button>
                </>
              ) : (
                routes.map((r) => (
                  <ListItem
                    key={r.title}
                    href={r.link}
                    className={`${
                      path === r.link ? 'bg-gray-300 text-black' : 'text-black'
                    }  hover:text-gray-700 text-sm`}>
                    {r.title}
                  </ListItem>
                ))
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </div>
    </NavigationMenuList>
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
            {...props}>
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
