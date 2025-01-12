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

    const { data, error } = await supabase
      .from('workspace_members')
      .select('workspace_id:workspaces(id, name)')
      .eq('user_id', user.id);

    if (error) {
      return { error: error.message, workspaces: [] };
    }
    const workspaces = data?.map((item) => ({
      id: item.workspace_id.id,
      name: item.workspace_id.name,
    })) || [];

    return { error: null, workspaces };
  } catch (err: any) {
    return { error: err.message || 'Unexpected error', workspaces: [] };
  }
} 