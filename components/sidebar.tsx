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
import { useWorkspaceStore } from '@/lib/store/workspace-store'

export default function AppSidebar({
  channels = [],
  directMessages = [],
}: {
  channels?: { id: string, name: string }[];
  directMessages?: { id: string, name: string }[];
}) {
  const params = useParams()
  const workspaceId = params?.workspaceId as string
  
  const { 
    workspaces, 
    currentWorkspace, 
    isLoading,
    error,
    fetchWorkspaces, 
    setCurrentWorkspace 
  } = useWorkspaceStore()

  React.useEffect(() => {
    fetchWorkspaces()
  }, [fetchWorkspaces])

  React.useEffect(() => {
    if (workspaceId && workspaces.length > 0) {
      const matchingWorkspace = workspaces.find(w => w.workspaces.id === workspaceId)
      if (matchingWorkspace) {
        setCurrentWorkspace(matchingWorkspace.workspaces)
      }
    }
  }, [workspaceId, workspaces, setCurrentWorkspace])
 
  return (
    <Sidebar className="w-64 flex-shrink-0">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="w-full justify-between">
                  {currentWorkspace?.name || 'No Workspace Selected'}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {workspaces.length > 0 ? (
                  <React.Fragment>
                    {workspaces.map((workspace) => (
                      <DropdownMenuItem key={workspace.workspaces.id} className="text-black">
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
              {channels.length > 0 ? (
                channels.map((channel) => (
                  <SidebarMenuItem key={channel.id}>
                    <SidebarMenuButton>
                      <Hash className="mr-2 h-4 w-4" />
                      {channel.name}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
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