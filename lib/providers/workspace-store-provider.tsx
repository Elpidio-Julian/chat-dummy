'use client'

import React, { createContext, useRef, useContext, type ReactNode } from 'react'
import { useStore } from 'zustand'

import { type WorkspaceStore, createWorkspaceStore, } from '@/lib/stores/workspace-store'

export type WorkspaceStoreApi = ReturnType<typeof createWorkspaceStore>

export const WorkspaceStoreContext = createContext<WorkspaceStoreApi | undefined>(
  undefined
)

export interface WorkspaceStoreProviderProps {
  children: ReactNode
}

export const WorkspaceStoreProvider = ({ 
  children 
}: WorkspaceStoreProviderProps) => {
  const storeRef = useRef<WorkspaceStoreApi>(null)
  if (!storeRef.current) {
    storeRef.current = createWorkspaceStore()
  }

  return (
    <WorkspaceStoreContext.Provider value={storeRef.current}>
      {children}
    </WorkspaceStoreContext.Provider>
  )
}

export const useWorkspaceStore = <T,>(
  selector: (store: WorkspaceStore) => T,
): T => {
  const workspaceStoreContext = useContext(WorkspaceStoreContext)

  if (!workspaceStoreContext) {
    throw new Error('useWorkspaceStoreContext must be used within a WorkspaceStoreProvider')
  }

  return useStore(workspaceStoreContext, selector)
}