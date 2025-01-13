# Components Directory Documentation

## Overview
The `components` directory contains reusable React components used throughout the application. It follows a modular structure with specialized subdirectories for different types of components.

## Directory Structure

### Root Components
- `sidebar.tsx`: Main navigation sidebar component
- `header.tsx`: Application header component
- `create-workspace-dialog.tsx`: Dialog for workspace creation
- `form-message.tsx`: Message display component for forms
- `chat-view.tsx`: Chat interface component
- `submit-button.tsx`: Reusable submit button component
- `theme-switcher.tsx`: Theme switching functionality component

### Subdirectories
- `/actions`: Server actions and API integrations
- `/ui`: UI components (using shadcn/ui)
- `/hooks`: Custom React hooks
- `/typography`: Typography-related components

## Component Details

### Main Components

#### sidebar.tsx
- Main navigation component
- Handles workspace navigation
- Implements responsive design
- Uses workspace store for state management

#### header.tsx
- Application header with navigation
- User profile information
- Theme switching integration
- Authentication status display

#### create-workspace-dialog.tsx
- Modal dialog for workspace creation
- Form validation
- Workspace creation API integration
- Error handling and success states

#### form-message.tsx
- Displays form-related messages
- Handles error and success states
- Provides feedback to users

#### chat-view.tsx
- Chat interface implementation
- Message display and formatting
- Real-time updates handling

#### submit-button.tsx
- Reusable button component
- Loading state handling
- Customizable styling

#### theme-switcher.tsx
- Theme switching functionality
- Light/dark mode toggle
- Theme persistence

### Specialized Directories

#### /actions
- Server-side actions
- API integrations
- Data fetching functions
- Authentication operations

#### /ui
- Shadcn UI components
- Custom UI elements
- Reusable design system components

#### /hooks
- Custom React hooks
- State management hooks
- Utility hooks
- Feature-specific hooks

#### /typography
- Typography components
- Text styling utilities
- Font-related components 