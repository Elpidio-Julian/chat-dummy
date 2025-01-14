'use client';

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { FormMessage, type Message } from './form-message';

import { createWorkspace } from '@/app/protected/_components/create-workspace';
import { useEffect } from 'react';
import { useWorkspaceStore } from '@/lib/providers/workspace-store-provider';
import { useRouter } from 'next/navigation';

export function CreateWorkspaceDialog() {
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState<Message | null>(null);
  const { setCurrentWorkspace, currentWorkspace, isLoading} = useWorkspaceStore((state) => state);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        redirect('/sign-in');
        return;
      }
      setUser(user);
    }
    getUser();
  }, [supabase.auth, setCurrentWorkspace]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    try {
      const workspace = await createWorkspace(name, user);
      setCurrentWorkspace(workspace.workspaces);
      console.log(JSON.stringify(workspace.workspaces), 'workspace');
      router.push(`/protected/workspace/${workspace.workspaces.id}`);
      setOpen(false);
      setName('');

    } catch (error) {
      console.log(error, 'error');
      setMessage({ error: 'Failed to create workspace' });
    } 
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Create a workspace
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create a workspace</DialogTitle>
            <DialogDescription>
              Enter a name for your new workspace.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Workspace Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            {message && <FormMessage message={message} />}
          </div>
          <DialogFooter>
            <Button type="submit" onSubmit={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Workspace'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
