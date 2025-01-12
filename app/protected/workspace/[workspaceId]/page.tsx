import { createClient } from "@/utils/supabase/server";
import { redirect, notFound } from "next/navigation";



export default async function WorkspacePage({ params }: { params: Promise<{ workspaceId: string }> }) {
  const supabase = await createClient();
  const { workspaceId } = await params;
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    redirect('/sign-in');
  }

  // Check if user is a member of this workspace
  const { data: membership, error: membershipError } = await supabase
    .from('workspace_members')
    .select('workspace_id')
    .match({ 
      workspace_id: workspaceId,
      user_id: user.id 
    })
    .single();

  if (membershipError || !membership) {
    return notFound();
  }

  // Get first channel in workspace
  const { data: channel, error: channelError } = await supabase
    .from('channels')
    .select('id')
    .eq('workspace_id', workspaceId)
    .order('created_at', { ascending: true })
    .limit(1)
    .single();

  if (channelError || !channel) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <h1 className="text-2xl font-bold">No channels found</h1>
        <p className="text-muted-foreground">This workspace has no channels yet</p>
      </div>
    );
  }

  // Redirect to first channel
  redirect(`/protected/workspace/${workspaceId}/channels/${channel.id}`);
}
