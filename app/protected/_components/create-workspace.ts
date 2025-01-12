'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

interface User {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  user_metadata: object;
  last_sign_in_at: string;
  app_metadata: object;
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
}

export async function createWorkspace(name: string, user: User) {
  const supabase = await createClient();

  // Create the workspace 
  const { data: workspace, error: workspaceError } = await supabase
    .from('workspaces')
    .insert([{ name, created_by: user.id }])
    .select()
    .single();

  if (workspaceError) {
    throw new Error(`Failed to create workspace: ${workspaceError.message}`);
  }

  revalidatePath('/protected/workspace');
  return workspace;
}
