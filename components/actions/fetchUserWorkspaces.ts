'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

interface WorkspaceData {
  workspaces: {
    id: string;
    name: string;
    description: string | null;
    created_at: string;
    created_by: string;
  }
}
// Fixed type error by:
// 1. Changing 'workspaceData' to 'workspaces' in return statement to match interface
// 2. Ensuring return type matches the interface { error: string | null; workspaces: WorkspaceData[] }

export async function fetchUserWorkspaces() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'No user found.', workspaceData: [] };
    }

    const { data: workspaceData, error: workspacesError } = await supabase
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
      return { error: workspacesError.message, workspaceData: [] };
    }

    return { error: null, workspaceData: workspaceData || [] };
  } catch (err: any) {
    return { error: err.message || 'Unexpected error', workspaceData: [] };
  }
} 