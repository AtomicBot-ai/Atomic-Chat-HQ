import { DownloadManagement } from '@/containers/DownloadManegement'
import { NavChats } from './NavChats'
import { NavMain } from './NavMain'
import { NavProjects } from './NavProjects'
import { useLeftPanel } from '@/hooks/useLeftPanel'

import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

export function LeftSidebar() {
  const { open: isLeftPanelOpen } = useLeftPanel()
  return (
    <div className='relative z-50'>
      <Sidebar variant="floating" collapsible="offcanvas">
        <SidebarHeader className="flex flex-col gap-1 px-1">
          <div className="flex w-full items-center justify-end">
            {isLeftPanelOpen && <DownloadManagement />}
            <SidebarTrigger className="text-muted-foreground rounded-full hover:bg-sidebar-foreground/8! -mt-0.5 relative z-50 ml-0.5" />
          </div>
          <img
            src="/images/overchat.png"
            alt="Overchat"
            className="ml-2 mt-1 size-8 shrink-0 object-contain"
          />
          <NavMain />
        </SidebarHeader>
        <SidebarContent className="mask-b-from-95% mask-t-from-98%">
          <NavProjects />
          <NavChats />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </div>
  )
}
