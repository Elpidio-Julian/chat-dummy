import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import AppSidebar from "@/components/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import Header from "@/components/header";
import { createWorkspace } from "@/components/actions/create-workspace";

export default async function WorkspacePage() {
  const supabase = await createClient();

  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    redirect('/sign-in');
  }

  // Check if user has any workspaces
  const { data: workspaces, error: workspacesError } = await supabase
    .from('workspace_members')
    .select('workspace_id')
    .eq('user_id', user.id)

  
  if (workspacesError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <h1 className="text-2xl font-bold">Error loading workspaces</h1>
        <p className="text-muted-foreground">Please try again later</p>
      </div>
    );
  }

  // If user has a workspace, redirect to the first one
  if (workspaces && workspaces.length > 0) {
    redirect(`/protected/workspace/${workspaces[0].id}`);
  }

  // If no workspaces, show create workspace UI
  return (
    <>
      <AppSidebar className="w-64 flex-shrink-0" />
      <div className="flex flex-1 overflow-hidden">
        <SidebarInset>
          <Header name="No Workspace yet" />
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6">
            <h1 className="text-2xl font-bold">Welcome to Chat Dummy!</h1>
            <p className="text-muted-foreground text-center max-w-md">
        You don't have any workspaces yet. Create your first workspace to get started.
            </p>
            <Link 
              href="/protected/workspace/new" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
             >
              Create Workspace
            </Link>
         </div>    
        </SidebarInset>
      </div>
    </>
  );
}
