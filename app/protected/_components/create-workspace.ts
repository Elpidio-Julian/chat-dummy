'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createWorkspace(name: string, userId: string) {
  const supabase = await createClient();

  // Create the workspace
  const { data: workspace, error: workspaceError } = await supabase
    .from('workspaces')
    .insert([{ name }])
    .select()
    .single();

  if (workspaceError) {
    throw new Error(`Failed to create workspace: ${workspaceError.message}`);
  }

  // Add the creator as a member
  const { error: memberError } = await supabase
    .from('workspace_members')
    .insert([{
      workspace_id: workspace.id,
      user_id: userId,
      role: 'admin'
    }]);

  if (memberError) {
    // Cleanup the workspace if member creation fails
    await supabase.from('workspaces').delete().eq('id', workspace.id);
    throw new Error(`Failed to add member to workspace: ${memberError.message}`);
  }

  // Create a default "general" channel
  const { error: channelError } = await supabase
    .from('channels')
    .insert([{
      name: 'general',
      workspace_id: workspace.id
    }]);

  if (channelError) {
    // Cleanup everything if channel creation fails
    await supabase.from('workspace_members').delete().eq('workspace_id', workspace.id);
    await supabase.from('workspaces').delete().eq('id', workspace.id);
    throw new Error(`Failed to create default channel: ${channelError.message}`);
  }

  revalidatePath('/protected/workspace');
  return workspace;
}
