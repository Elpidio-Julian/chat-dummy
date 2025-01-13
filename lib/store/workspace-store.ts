import { create } from 'zustand'
import { fetchUserWorkspaces } from '@/components/actions/fetchUserWorkspaces'

interface Workspace {
  id: string
  name: string
}

interface WorkspaceStore {
  workspaces: Workspace[]
  currentWorkspace: Workspace
  isLoading: boolean
  error: string | null
  fetchWorkspaces: () => Promise<void>
  setCurrentWorkspace: (workspace: Workspace) => void
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  workspaces: [],
  currentWorkspace: null,
  isLoading: false,
  error: null,
  fetchWorkspaces: async () => {
    set({ isLoading: true, error: null })
    try {
      const { workspaces, error } = await fetchUserWorkspaces()
      if (error) throw new Error(error.message)
      set({ workspaces, isLoading: false })
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },
  setCurrentWorkspace: (workspace) => {
    set({ currentWorkspace: workspace })
  },
})) 