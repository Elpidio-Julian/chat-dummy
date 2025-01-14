import { createClient } from "@/utils/supabase/server";
import { useRouter } from "next/navigation";
import AppSidebar from "@/components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/header";
import { CreateWorkspaceDialog } from "@/components/create-workspace-dialog";
import { redirect } from "next/navigation";



export default async function WorkspacePage() {
  const supabase = await createClient();

  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    redirect('/sign-in');
  }
  

  // If no workspaces, show create workspace UI
  return (

    <SidebarProvider >
      <AppSidebar />
      <div className="flex flex-1 overflow-hidden">
      <SidebarInset>
       <Header />
       <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6">
       <h1 className="text-2xl font-bold">Welcome to Chat Dummy!</h1>
            <p className="text-muted-foreground text-center max-w-md">
        You don't have any workspaces yet. Create your first workspace to get started.
            </p>
            <CreateWorkspaceDialog />
    </div>
        
      </SidebarInset>
      </div>
    </SidebarProvider>
            
  );
}
