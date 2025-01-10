import React from 'react'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { Database } from '@/types/supabase'
import WorkspaceSwitchButton from './workspace-switch-button'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'

interface ProtectedSidebarProps {
  params?: { workspaceId?: string }
}

export default async function ProtectedSidebar({ params }: ProtectedSidebarProps) {
  const { workspaceId } = params || {}

  // Create a Supabase server client
  const supabase = await createClient()

  // Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (!user || userError) {
    return (
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Authentication</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <div className="p-4">You must be logged in.</div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
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
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <div className="p-4">
                    <p>No workspaces found.</p>
                    <WorkspaceSwitchButton />
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
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
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <WorkspaceSwitchButton />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Channels</SidebarGroupLabel>
          <SidebarMenu>
            {workspaceId ? (
              channels.length ? (
                channels.map((ch) => (
                  <SidebarMenuItem key={ch.id}>
                    <SidebarMenuButton asChild>
                      <a href={`/workspace/${workspaceId}/channel/${ch.id}`}>
                        {ch.name}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <div className="p-4">No channels in this workspace yet.</div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            ) : (
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <div className="p-4">Please select a workspace.</div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}