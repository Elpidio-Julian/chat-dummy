"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
// import { Database } from '@/types/supabase'; // Adjust if you have a custom type definition
// ShadCN UI Dialog components:
// run: npx shadcn-ui add dialog
// then reference in your local components/ui/dialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';


type Workspace = {
  id: string;
  name: string;
};

interface WorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  workspaces?: Workspace[];
}

export default function WorkspaceModal({
  isOpen,
  onClose,
  workspaces = [],
}: WorkspaceModalProps) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchedWorkspaces, setFetchedWorkspaces] = useState<Workspace[]>(workspaces);

  useEffect(() => {
    if (isOpen && workspaces.length === 0) {
      (async () => {
        try {
          setLoading(true);
          setError(null);

          const { data: userData } = await supabase.auth.getUser();
          if (!userData.user) {
            setError('No user found.');
            return;
          }

          const { data, error: fetchError } = await supabase
            .from('workspace_members')
            .select('workspace_id:workspaces(id, name)')
            .eq('user_id', userData.user.id);

          if (fetchError) {
            setError(fetchError.message);
          } else if (data) {
            const mapped = data.map((item) => ({
              id: item.workspace_id.id,
              name: item.workspace_id.name,
            }));
            setFetchedWorkspaces(mapped);
          }
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [isOpen, workspaces, supabase]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        // If the dialog is closed, call onClose
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your Workspaces</DialogTitle>
          <DialogDescription>Manage or create workspaces</DialogDescription>
        </DialogHeader>

        {loading && <p className="text-sm text-gray-500">Loading...</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}
        {!loading && !error && (
          <>
            {fetchedWorkspaces.length === 0 ? (
              <p className="mb-4">You have no workspaces yet.</p>
            ) : (
              <ul className="mb-4">
                {fetchedWorkspaces.map((ws) => (
                  <li key={ws.id} className="py-1">
                    {ws.name}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        <DialogFooter>
          <button
            onClick={() => {
              // Optionally navigate to a create-workspace page
            }}
            className="block w-full px-4 py-2 text-center text-white bg-blue-500 hover:bg-blue-600 rounded"
          >
            Create a New Workspace
          </button>
          <button
            onClick={onClose}
            className="mt-3 block w-full px-4 py-2 text-center bg-gray-300 hover:bg-gray-400 rounded"
          >
            Close
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 