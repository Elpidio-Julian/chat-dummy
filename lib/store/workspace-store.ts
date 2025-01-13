import { create } from 'zustand'
import { fetchUserWorkspaces } from '@/components/actions/fetchUserWorkspaces'

interface WorkspaceData {
  workspaces: {
    id: string;
    name: string;
    description: string | null;
    created_at: string;
    created_by: string;
  }
}

interface Workspace {
  workspaces: {
    id: string;
    name: string;
    description: string | null;
    created_at: string;
    created_by: string;
  }
}

interface WorkspaceStore {
  workspaceData: WorkspaceData[]
  currentWorkspace: Workspace | null
  isLoading: boolean
  error: string | null
  fetchWorkspaces: () => Promise<void>
  setCurrentWorkspace: (workspace: WorkspaceData) => void
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  workspaceData: [],
  currentWorkspace: null,
  isLoading: false,
  error: null,
  fetchWorkspaces: async () => {
    set({ isLoading: true, error: null })
    try {
      const { workspaceData, error } = await fetchUserWorkspaces()
      if (error) throw new Error(error)
      set({ workspaceData: workspaceData as WorkspaceData[], isLoading: false })
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },
  setCurrentWorkspace: (workspace) => {
    set({ currentWorkspace: workspace })
  },
})) 