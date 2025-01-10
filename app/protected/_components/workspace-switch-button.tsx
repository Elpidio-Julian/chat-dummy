"use client";

import React, { useState } from 'react';
import WorkspaceModal from './workspace-modal';

export default function WorkspaceSwitchButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full px-4 py-2 text-left bg-gray-100 hover:bg-gray-200 font-medium"
        aria-label="Switch Workspace"
      >
        Switch Workspace
      </button>
      <WorkspaceModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
} 