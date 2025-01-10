import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import ProtectedSidebar from "@/app/protected/_components/protected-sidebar"
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ProtectedSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}