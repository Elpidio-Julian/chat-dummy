# Lib Directory Documentation

## Overview
The `lib` directory contains utility functions, store management, and shared functionality used across the application. It serves as a central location for reusable code and state management.

## Directory Structure

### Root Files
- `utils.ts`: General utility functions and helpers

### Store Directory
- `store/workspace-store.ts`: Workspace state management using Zustand

## Detailed Documentation

### utils.ts
Utility functions for:
- Common helper functions
- Type definitions
- Shared constants
- Helper utilities used across the application

### Store

#### workspace-store.ts
Zustand store implementation for workspace management:
- Workspace state management
- State persistence
- Workspace actions and mutations
- Types and interfaces for workspace data

Features:
- Current workspace management
- Workspace list handling
- State updates and synchronization
- Workspace selection and navigation

Implementation:
```typescript
interface WorkspaceStore {
  currentWorkspace: Workspace | null;
  workspaces: Workspace[];
  setCurrentWorkspace: (workspace: Workspace) => void;
  setWorkspaces: (workspaces: Workspace[]) => void;
}
```

Usage:
- Used by components to access and modify workspace state
- Provides real-time workspace updates
- Handles workspace synchronization
- Manages workspace selection state 