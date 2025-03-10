import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader
} from '@/components/ui/sidebar'

export const LeftSidebarCalendar = () => {
  return (
    <Sidebar
      className='mt-[4rem] h-full'
      side='left'
      variant='sidebar'>
      <SidebarHeader />
      <SidebarContent className='bg-red-500'>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
