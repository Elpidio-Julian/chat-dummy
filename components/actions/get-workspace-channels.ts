'use server';

import { createClient } from '@/utils/supabase/server';
import { validateWorkspaceMembership } from './validate-workspace-membership';

export async function getWorkspaceChannels(workspaceId: string) {
  console.log(workspaceId, 'workspaceId');
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'No user found.', channels: [] };
    }

    // Check if user is a member of this workspace
    const { error: membershipError } = await validateWorkspaceMembership(workspaceId);

    if (membershipError) {
      return { error: membershipError.message, channels: [] };
    }
  

    // Get workspace channels
    const { data: channels, error: channelsError } = await supabase
      .from('channels')
      .select('id, name')
      .eq('workspace_id', workspaceId)
      .order('created_at', { ascending: true });

    if (channelsError) {
      return { error: channelsError.message, channels: [] };
    }

    return { error: null, data: channels || [] };
  } catch (err: any) {
    return { error: err.message || 'Unexpected error', channels: [] };
  }
}
