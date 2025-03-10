import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader
} from '@/components/ui/sidebar'

export const RightSidebarCalendar = () => {
  return (
    <Sidebar
      className='mt-[4rem]'
      side='right'
      variant='sidebar'>
      <SidebarHeader />
      <SidebarContent className='bg-purple-500'>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
