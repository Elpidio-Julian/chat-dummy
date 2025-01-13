import { createClient } from "@/utils/supabase/server";
import { redirect, notFound } from "next/navigation";
import { getWorkspaceChannels } from "@/components/actions/get-workspace-channels";


export default async function WorkspacePage({ params }: { params: Promise<{ workspaceId: string }> }) {
  const supabase = await createClient();
  const { workspaceId } = await params;
  // Get current user
  const { data:  user, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    redirect('/sign-in');
  }
  

  const { channels, error: ChannelError } = await getWorkspaceChannels(workspaceId);

  if (ChannelError) {
    console.log(ChannelError);
    redirect('/protected/workspace');
  } 
  // Redirect to first channel
  redirect(`/protected/workspace/${workspaceId}/channels/${channels[0].id}`);
}
