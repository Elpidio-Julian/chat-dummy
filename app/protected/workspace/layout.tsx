import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import AppSidebar from "@/components/sidebar";
import Header from "@/components/header";
import ChatView from "@/components/chat-view";
export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 

  return (
    <SidebarProvider >
      <AppSidebar />
      <div className="flex flex-1 overflow-hidden">
      <SidebarInset>
       <Header name="No Workspace yet" />
       <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6">
      {children}
    </div>
        
      </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
