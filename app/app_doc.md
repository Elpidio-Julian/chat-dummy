# App Directory Documentation

## Overview
The `app` directory contains the core application structure using Next.js 13+ App Router. This directory follows Next.js file-system based routing and contains all the routes, layouts, and pages of the application.

## Directory Structure

### Root Files
- `layout.tsx`: The root layout component that wraps all pages. Contains global providers and layout elements.
- `page.tsx`: The root page component (homepage).
- `globals.css`: Global CSS styles including Tailwind CSS utilities.
- `actions.ts`: Server actions for handling authentication and user-related operations.

### Key Directories
- `/auth`: Authentication-related components and pages
- `/protected`: Protected routes that require authentication
- `/(auth-pages)`: Authentication-related pages using route groups

## Components and Functions

### layout.tsx
- Root layout component
- Implements global providers and HTML structure
- Handles metadata and font loading

### actions.ts
Key server actions:
- Authentication operations
- User management functions
- Session handling

### globals.css
- Global styles configuration
- Tailwind CSS imports and customizations
- Custom CSS variables and utilities

### page.tsx
- Root page implementation
- Landing page content
- Initial routing logic

## Protected Routes
The `/protected` directory contains routes that require authentication:
- Workspace management
- User settings
- Application features

## Authentication
The `/auth` directory handles:
- Login/Signup flows
- Authentication state management
- Protected route middleware

## Route Groups
The `/(auth-pages)` directory uses Next.js route grouping for:
- Login page
- Registration page
- Password reset functionality 