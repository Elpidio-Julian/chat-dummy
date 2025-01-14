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
  

  const { data: channels , error: ChannelError } = await getWorkspaceChannels(workspaceId);
  
  if (ChannelError || !channels || channels.length === 0) {
    console.log(ChannelError);
    redirect('/protected/workspace');
  } 

  const channelId = channels[0].id;
  // Redirect to first channel
  redirect(`/protected/workspace/${workspaceId}/channels/${channelId}`);
}
