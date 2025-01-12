import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Header from '@/components/header'
import AppSidebar from '@/components/sidebar'
import ChatView from '@/components/chat-view'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import AuthHeader from '@/components/auth-header'

export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/sign-in");
  }

  return (
    <SidebarProvider >
              {children}       
    </SidebarProvider>
  );
}
