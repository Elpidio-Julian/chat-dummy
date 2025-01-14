import { createStore } from 'zustand/vanilla'
import { fetchUserWorkspaces } from '@/components/actions/fetchUserWorkspaces'
import { getWorkspaceChannels } from '@/components/actions/get-workspace-channels'

export type BaseWorkspace = {
  id: string
  name: string
  description: string | null
  created_at: string
  created_by: string
}

export type Workspace = {
  workspaces: BaseWorkspace
}

export type Channel = {
  id: string
  name: string
}

export type WorkspaceData = {
  id: string
  name: string
  description: string | null
  created_at: string
  created_by: string
  workspaces: BaseWorkspace
}

export type WorkspaceState = {
  workspaces: WorkspaceData[]
  currentWorkspace: Workspace | null
  isLoading: boolean
  error: string | null
}

export type WorkspaceActions = {
  fetchWorkspaces: () => Promise<void>
  setCurrentWorkspace: (workspace: Workspace) => void
}

export type WorkspaceStore = WorkspaceState & WorkspaceActions

export const defaultInitState: WorkspaceState = {
  workspaces: [],
  currentWorkspace: null,
  isLoading: false,
  error: null,
}

export const createWorkspaceStore = (
  initState: WorkspaceState = defaultInitState,
) => {
  return createStore<WorkspaceStore>()((set) => ({
    ...initState,
    fetchWorkspaces: async () => {
      set((state) => ({ ...state, isLoading: true, error: null }))
      try {
        const { workspaceData, error } = await fetchUserWorkspaces()
        if (error) throw new Error(error)
        set((state) => ({
          ...state,
          workspaces: workspaceData as WorkspaceData[],
          isLoading: false
        }))
      } catch (error) {
        set((state) => ({
          ...state,
          error: (error as Error).message,
          isLoading: false
        }))
      }
    },
    setCurrentWorkspace: (workspace: Workspace) => {
      set((state) => ({ ...state, currentWorkspace: workspace }))
    },
  }))
}
