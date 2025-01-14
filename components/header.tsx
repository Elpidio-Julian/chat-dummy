'use client'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, LogOut, User } from 'lucide-react'
import { signOutAction } from "@/app/actions";
import { useWorkspaceStore } from '@/lib/providers/workspace-store-provider'

export default function Header() { 
  const { currentWorkspace } = useWorkspaceStore((state) => state)
  type WorkspaceData = {
    workspaces: {
      id: string;
      name: string;
      description: string;
      created_at: string;
      created_by: string;
    }
  }
  const workspaceData = currentWorkspace as unknown as WorkspaceData;
  return (
    <header className="flex items-center justify-between border-b px-6 py-2">
      <h1 className="text-lg font-semibold">{workspaceData?.workspaces.name || 'No workspace selected'}</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 rounded-full">
            <User className="h-4 w-4" />
            <span className="sr-only">User menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem onSelect={signOutAction}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

