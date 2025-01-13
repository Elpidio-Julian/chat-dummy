'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function fetchUserWorkspaces() {
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
    .select(`
      workspaces (
        id,
        name,
        description,
        created_at,
        created_by
      )
    `)

    if (workspacesError) {
      return { error: workspacesError.message, workspaces: [] };
    }


    return { error: null, workspaces };
  } catch (err: any) {
    return { error: err.message || 'Unexpected error', workspaces: [] };
  }
} 