import { CustomTrigger } from '@/components/administrar-clases/sidebar/button/CustomTrigger'
import { LeftSidebarCalendar } from '@/components/administrar-clases/sidebar/LeftSidebarCalendar'
import { RightSidebarCalendar } from '@/components/administrar-clases/sidebar/RightSidebarCalendar'
import { SidebarProvider } from '@/components/ui/sidebar'

export default function AdminClassLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex w-full h-screen relative'>
      <div className='absolute left-0 top-0 h-full z-9'>
        <SidebarProvider>
          <div className='flex'>
            <LeftSidebarCalendar />
            <CustomTrigger admin='Usuario' />
          </div>
        </SidebarProvider>
      </div>
      <div className='bg-green-500 w-full h-full'>{children}</div>
      <div className='absolute right-0 top-0 h-full z-9'>
        <SidebarProvider>
          <CustomTrigger admin='Clase' />
          <RightSidebarCalendar />
        </SidebarProvider>
      </div>
    </main>
  )
}
