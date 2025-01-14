'use client'

import { useParams } from 'next/navigation'
import * as React from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { ChevronDown, Hash, MessageSquare, Plus } from 'lucide-react'
import { CreateWorkspaceDialog } from "@/components/create-workspace-dialog"
import { useWorkspaceStore } from '@/lib/providers/workspace-store-provider'
import { useRouter } from 'next/navigation';
import { Channel, Workspace, WorkspaceData } from '@/lib/stores/workspace-store';

export default function AppSidebar({
  directMessages = [],
  channels = {} as Channel,
}: {
  directMessages?: { id: string, name: string }[];
  channels?: Channel;
}) {
  const params = useParams()
  const workspaceId = params?.workspaceId as string
  const router = useRouter()
  const { 
    workspaces, 
    currentWorkspace, 
    isLoading,
    error,
    fetchWorkspaces, 
    setCurrentWorkspace,
  } = useWorkspaceStore((state) => state)

  
  React.useEffect(() => {
    fetchWorkspaces()
  }, [fetchWorkspaces])
 
  async function handleChannelChange(channel: Channel) {
    router.push(`/protected/workspace/${workspaceId}/channels/${channel.id}`);
  }

  async function handleWorkspaceChange(workspace: WorkspaceData) {
    const newWorkspace: Workspace = {
      workspaces: workspace.workspaces
    }
    setCurrentWorkspace(newWorkspace)
    router.push(`/protected/workspace/${workspace.workspaces.id}`);
  }

  return (
    <Sidebar className="w-64 flex-shrink-0">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="w-full justify-between">
                  {currentWorkspace?.workspaces?.name || 'No Workspace Selected'}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {workspaces?.length > 0 ? (
                  <React.Fragment>
                    {workspaces.map((workspace) => (
                      <DropdownMenuItem key={workspace.workspaces.id} onSelect={() => handleWorkspaceChange(workspace)} className="text-black">
                        {workspace.workspaces.name}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                  </React.Fragment>
                ) : (
                  <DropdownMenuItem disabled>
                    {isLoading ? 'Loading...' : error || 'No workspaces available'}
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <CreateWorkspaceDialog />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Channels</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {channels ? (
                  <SidebarMenuItem key={channels.id}>
                    <SidebarMenuButton>
                      <Hash className="mr-2 h-4 w-4" />
                      {channels.name}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton disabled>
                    <Hash className="mr-2 h-4 w-4" />
                    No channels available
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            Direct Messages
            <button className="ml-auto hover:bg-accent hover:text-accent-foreground rounded-sm p-1">
              <Plus className="h-4 w-4" />
            </button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {directMessages.length > 0 ? (
                directMessages.map((directMessage) => (
                  <SidebarMenuItem key={directMessage.id}>
                    <SidebarMenuButton>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      {directMessage.name}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton disabled>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    No direct messages available
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}