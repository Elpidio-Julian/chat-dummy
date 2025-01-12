'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function fetchUserWorkspacesIds() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'No user found.', workspaces: [] };
    }

    const { data: workspaces, error: workspacesError } = await supabase
    .from('workspace_members')
    .select('workspace_id')
    .eq('user_id', user.id)

    if (workspacesError) {
      return { error: workspacesError.message, workspaces: [] };
    }
    const workspacesData = workspaces?.map((item) => ({
      id: item.workspace_id,
    })) || [];

    return { error: null, workspaces: workspacesData };
  } catch (err: any) {
    return { error: err.message || 'Unexpected error', workspaces: [] };
  }
} 