// Example: create-workspace.ts 
import { createClient } from "@/utils/supabase/server";

export async function createWorkspace(name: string, userId: string) {
  const supabase = await createClient();

  // Create the workspace
  const { data: workspace, error: workspaceError } = await supabase
    .from("workspaces")
    .insert([
      {
        name,
        created_by: userId,
      },
    ])
    .select("*")
    .single();

  if (workspaceError || !workspace) {
    throw new Error(workspaceError?.message || "Failed to create workspace");
  }

  // Insert the default "general" channel for the new workspace
  const { error: channelError } = await supabase.from("channels").insert([
    {
      name: "general",
      workspace_id: workspace.id,
      created_by: userId,
    },
  ]);

  if (channelError) {
    throw new Error(channelError.message);
  }

  return workspace;
}