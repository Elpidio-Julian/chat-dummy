# Product Requirements Document (PRD) for Slack Clone MVP

## Project Overview
Develop a real-time messaging platform similar to Slack using Next.js for the frontend, Docker for containerization, and Supabase for backend services and authentication. The MVP will enable users to communicate through channels and direct messages with essential collaboration features.

## User Roles & Core Workflows
1. **User Registration & Authentication:** Users can register, log in, and manage their profiles.
2. **Workspace Management:** Users can create and manage workspaces, with creators becoming workspace admins.
3. **Channel Management:** Workspace members can create channels, workspace moderators can manage/delete channels.
4. **Messaging:** Users can send, edit, and delete messages within channels and direct messages.
5. **Moderation:** Workspace moderators can delete messages and ban members from workspaces.
6. **File Sharing:** Users can upload and download files in conversations.
7. **Emoji Reactions:** Users can react to messages with emojis.
8. **User Presence:** Real-time status updates indicating online/offline status.

## Technical Foundation

### Data Models
- **User:** id, email, username, full_name, avatar_url, status_message, is_online, last_seen, created_at
- **Workspace:** id, name, description, created_by, created_at
- **Workspace Members:** workspace_id, user_id, role (admin/moderator/member), joined_at, is_banned
- **Channel:** id, workspace_id, name, description, is_private, created_by, created_at
- **Channel Members:** channel_id, user_id, role, joined_at
- **Message:** id, content, sender_id, channel_id, parent_id, is_direct_message, created_at, updated_at
- **Direct Message:** message_id, sender_id, recipient_id
- **File:** id, name, url, type, size, message_id, uploaded_by, created_at
- **Reaction:** id, message_id, user_id, emoji, created_at

### API Endpoints
1. **Auth:**
   - `POST /api/auth/register` – Register a new user.
   - `POST /api/auth/login` – User login.
   - `POST /api/auth/logout` – User logout.
   - `GET /api/users/me` – Get user profile.
   - `PUT /api/users/me` – Update user profile.
2. **Workspaces:**
   - `GET /api/workspaces` – List user's workspaces
   - `POST /api/workspaces` – Create a workspace
   - `GET /api/workspaces/:id` – Get workspace details
   - `PUT /api/workspaces/:id` – Update workspace (Admins)
   - `DELETE /api/workspaces/:id` – Delete workspace (Admins)
3. **Workspace Members:**
   - `GET /api/workspaces/:id/members` – List workspace members
   - `POST /api/workspaces/:id/members` – Invite member
   - `PUT /api/workspaces/:id/members/:userId` – Update member role
   - `DELETE /api/workspaces/:id/members/:userId` – Remove/ban member
   - `POST /api/workspaces/:id/members/:userId/unban` – Unban member
4. **Channels:**
   - `GET /api/workspaces/:workspaceId/channels` – List workspace channels
   - `POST /api/workspaces/:workspaceId/channels` – Create a channel
   - `GET /api/workspaces/:workspaceId/channels/:id` – Get channel details
   - `PUT /api/workspaces/:workspaceId/channels/:id` – Update channel (Moderators/Admins)
   - `DELETE /api/workspaces/:workspaceId/channels/:id` – Delete channel (Moderators/Admins)
5. **Channel Members:**
   - `GET /api/channels/:id/members` – List channel members.
   - `POST /api/channels/:id/members` – Add member (Admins).
   - `DELETE /api/channels/:id/members/:userId` – Remove member (Admins).
6. **Messages:**
   - `GET /api/channels/:id/messages` – List channel messages.
   - `POST /api/channels/:id/messages` – Send message.
   - `PUT /api/messages/:id` – Edit message (Sender/Admin).
   - `DELETE /api/messages/:id` – Delete message (Sender/Admin).
7. **Direct Messages:**
   - `GET /api/dms` – List direct conversations.
   - `GET /api/dms/:id/messages` – List DM messages.
   - `POST /api/dms/:id/messages` – Send DM.
8. **Files:**
   - `POST /api/files/upload` – Upload file.
   - `GET /api/files/:id/download` – Download file.
   - `GET /api/files/search` – Search files.
9. **Reactions:**
   - `POST /api/messages/:id/reactions` – Add reaction.
   - `DELETE /api/messages/:id/reactions/:reactionId` – Remove reaction.

### Key Components
- **Frontend:**
  - Login/Register Pages
  - Dashboard with Sidebar and Channel Lists
  - Channel and Direct Message Views
  - Message Input and Display Components
  - User Profile and Settings Pages
  - Workspace Creation and Management
  - Workspace Settings and Member Management
  - Moderator Control Panel
- **Backend:**
  - API Routes for all endpoints
  - Real-time messaging with Supabase Realtime
  - Authentication and Authorization with Supabase
- **Infrastructure:**
  - Docker containers for Next.js, Supabase, and optional Redis
  - Supabase Storage for file handling

## MVP Launch Requirements
1. **User Authentication:** Registration, login, and profile management.
2. **Workspace Management:** Create and manage workspaces with proper role-based permissions
3. **Channel Creation and Management:** Create, join, and manage channels.
4. **Real-Time Messaging:** Send and receive messages instantly in channels and direct messages.
5. **File Upload and Download:** Allow users to share and access files within conversations.
6. **Emoji Reactions:** Enable users to react to messages with emojis.
7. **User Presence Indicators:** Display real-time online/offline status of users.
8. **Workspace Management:** Create and manage workspaces with proper role-based permissions
9. **Moderation Tools:** Enable workspace moderators to manage content and members
10. **Basic UI/UX:** Intuitive interface with essential navigation and responsive design
11. **Security:** Implement authentication, authorization, and secure file storage
12. **Deployment Setup:** Dockerized environment for seamless deployment and scalability
13. **Logging and Error Handling:** Centralized logging and robust error management for maintenance

---

This PRD outlines the essential components and requirements to develop a functional Slack clone MVP, ensuring a focused and actionable roadmap for implementation.