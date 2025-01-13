'use server';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function validateWorkspaceMembership(workspaceId: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { error: 'No authenticated user found', isMember: false };
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
   redirect('/protected/workspace');
 }

    return { error: null, isMember: !!membership };
  } catch (err: any) {
    return { error: err.message || 'Unexpected error occurred', isMember: false };
  }
}
