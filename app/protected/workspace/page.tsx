import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import AppSidebar from "@/components/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import Header from "@/components/header";
import { CreateWorkspaceDialog } from "@/components/create-workspace-dialog";
import { createWorkspace } from "@/app/protected/_components/create-workspace";
import { revalidatePath } from "next/cache";
import { fetchUserWorkspaces } from "@/components/actions/fetchUserWorkspaces";


export default async function WorkspacePage() {
  const supabase = await createClient();

  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    redirect('/sign-in');
  }


  // If no workspaces, show create workspace UI
  return (
          <>
          
            <h1 className="text-2xl font-bold">Welcome to Chat Dummy!</h1>
            <p className="text-muted-foreground text-center max-w-md">
        You don't have any workspaces yet. Create your first workspace to get started.
            </p>
            <CreateWorkspaceDialog />
          </>
  );
}
