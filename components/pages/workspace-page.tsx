'use client'

import { useWorkspaceStore } from '@/lib/providers/workspace-store-provider'

export const WorkspacePage = () => {
  const { workspaces } = useWorkspaceStore((state) => state)

  
  return <div>
    {workspaces.map((workspace) => (
      <div key={workspace.id}>{workspace.name}</div>
    ))}
  </div>
}