import React from 'react'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { Database } from '@/types/supabase'
import WorkspaceSwitchButton from './workspace-switch-button'

interface ProtectedSidebarProps {
  params?: { workspaceId?: string }
}

export default async function ProtectedSidebar({ params }: ProtectedSidebarProps) {
  const { workspaceId } = params || {}

  // Create a Supabase server client
  const supabase = await createClient();

  // Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (!user || userError) {
    return (
      <aside className="w-64 bg-white border-r h-screen flex flex-col">
        <div className="p-4 border-b">You must be logged in.</div>
      </aside>
    )
  }

  // Check user’s workspace memberships
  const { data: memberships, error: membershipError } = await supabase
    .from('workspace_members')
    .select('workspace_id')
    .eq('user_id', user.id)

  // If user has no memberships or an error occurred
  if (membershipError || !memberships || memberships.length === 0) {
    return (
      <aside className="w-64 bg-white border-r h-screen flex flex-col">
        <div className="p-4 border-b">
          <p>No workspaces found.</p>
          {/* 
            Optionally give them a button to open Workspace Switch or prompt to create 
          */}
          <WorkspaceSwitchButton />
        </div>
      </aside>
    )
  }

  // If there's a valid workspaceId, fetch channels for that workspace
  let channels: { id: string; name: string }[] = []

  if (workspaceId) {
    const { data: channelData, error: channelError } = await supabase
      .from('channels')
      .select('id, name')
      .eq('workspace_id', workspaceId)

    if (!channelError && channelData) {
      channels = channelData
    }
  }

  return (
    <aside className="w-64 bg-white border-r h-screen flex flex-col">
      <div className="p-4 border-b">
        <WorkspaceSwitchButton />
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        {workspaceId ? (
          channels.length ? (
            <ul>
              {channels.map((ch) => (
                <li key={ch.id}>
                  {ch.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>No channels in this workspace yet.</p>
          )
        ) : (
          <p>Please select a workspace.</p>
        )}
      </nav>
    </aside>
  )
}