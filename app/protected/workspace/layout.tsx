import { createClient } from "@/utils/supabase/server";
import { WorkspaceStoreProvider } from '@/lib/providers/workspace-store-provider'
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
    <WorkspaceStoreProvider>
      {children}
    </WorkspaceStoreProvider>
  );
}
