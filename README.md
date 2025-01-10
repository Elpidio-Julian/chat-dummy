<a href="https://demo-nextjs-with-supabase.vercel.app/">
  <img alt="Next.js and Supabase Starter Kit - the fastest way to build apps with Next.js and Supabase" src="https://demo-nextjs-with-supabase.vercel.app/opengraph-image.png">
  <h1 align="center">Next.js and Supabase Starter Kit</h1>
</a>

<p align="center">
 The fastest way to build apps with Next.js and Supabase
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="#deploy-to-vercel"><strong>Deploy to Vercel</strong></a> ·
  <a href="#clone-and-run-locally"><strong>Clone and run locally</strong></a> ·
  <a href="#feedback-and-issues"><strong>Feedback and issues</strong></a>
  <a href="#more-supabase-examples"><strong>More Examples</strong></a>
</p>
<br/>

## Features

- Works across the entire [Next.js](https://nextjs.org) stack
  - App Router
  - Pages Router
  - Middleware
  - Client
  - Server
  - It just works!
- supabase-ssr. A package to configure Supabase Auth to use cookies
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Components with [shadcn/ui](https://ui.shadcn.com/)
- Optional deployment with [Supabase Vercel Integration and Vercel deploy](#deploy-your-own)
  - Environment variables automatically assigned to Vercel project

## Demo

You can view a fully working demo at [demo-nextjs-with-supabase.vercel.app](https://demo-nextjs-with-supabase.vercel.app/).

## Deploy to Vercel

Vercel deployment will guide you through creating a Supabase account and project.

After installation of the Supabase integration, all relevant environment variables will be assigned to the project so the deployment is fully functioning.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&demo-title=nextjs-with-supabase&demo-description=This+starter+configures+Supabase+Auth+to+use+cookies%2C+making+the+user%27s+session+available+throughout+the+entire+Next.js+app+-+Client+Components%2C+Server+Components%2C+Route+Handlers%2C+Server+Actions+and+Middleware.&demo-url=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&demo-image=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2Fopengraph-image.png)

The above will also clone the Starter kit to your GitHub, you can clone that locally and develop locally.

If you wish to just develop locally and not deploy to Vercel, [follow the steps below](#clone-and-run-locally).

## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Create a Next.js app using the Supabase Starter template npx command

   ```bash
   npx create-next-app -e with-supabase
   ```

3. Use `cd` to change into the app's directory

   ```bash
   cd name-of-new-app
   ```

4. Rename `.env.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

5. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The starter kit should now be running on [localhost:3000](http://localhost:3000/).

6. This template comes with the default shadcn/ui style initialized. If you instead want other ui.shadcn styles, delete `components.json` and [re-install shadcn/ui](https://ui.shadcn.com/docs/installation/next)

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

## Feedback and issues

Please file feedback and issues over on the [Supabase GitHub org](https://github.com/supabase/supabase/issues/new/choose).

## More Supabase examples

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth and the Next.js 13 App Router (free course)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- [Supabase Auth and the Next.js App Router](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)


## Docker

### Development environment startup
Note: You must be in the directory where the docker-compose.yml file is located to run the following commands.

```bash
docker compose up
```
Start development environment with docker compose

```bash
docker compose down
```
Stop development environment with docker compose

Connect to development site with 127.0.0.1:3000

### Production build

```bash
docker build -t chat-dummy .
docker run -p 3000:3000 chat-dummy
```
Build production environment with docker compose


Requirements:
For the purposes of developing ChatGenius, here are the core features you should target:
1. Authentication
2. Real-time messaging
3. Channel/DM organization
4. File sharing & search
5. User presence, & status
6. Thread support
7. Emoji reactions


## USER STORIES NOTES


### Users' User Stories:

1. As a user, I need to be able to authenticate to the application so that I can access all the features of the chat platform.
2. As a user, I want to have the ability to send and receive real-time messages to and from my friends and colleagues so that I can communicate efficiently.
3. As a user, I need to be able to organize my channels and direct messages so that I can easily find and participate in conversations.
4. As a user, I want to be able to share files and search for files within the application so that I can collaborate and retrieve important information.
5. As a user, I need to know the status and presence of my colleagues so that I can initiate conversations and collaborate more effectively.
6. As a user, I want to be able to engage in threaded conversations so that I can have more in-depth discussions.
7. As a user, I need to be able to react to messages with emojis to show my emotions and add tone to the conversation.

### Moderators' User Stories:

1. As a moderator, I need to have the ability to manage channels so that I can control the conversation flow and maintain order.
2. As a moderator, I want to be able to remove messages and ban users from the application so that I can enforce community guidelines and maintain a positive environment.


These user stories will serve as the foundation for designing the technical requirements and data models for your Slack clone MVP.

### TECHNICAL REQUIREMENTS

I'll outline the technical architecture based on the user stories:

# Data Models & Relationships

## User Model
```sql
users (extends Supabase auth.users)
- id: uuid (PK)
- email: string
- username: string
- full_name: string
- avatar_url: string
- status_message: string
- is_online: boolean
- last_seen: timestamp
- created_at: timestamp
```

## Channel Model
```sql
channels
- id: uuid (PK)
- name: string
- description: string
- is_private: boolean
- created_by: uuid (FK -> users.id)
- created_at: timestamp
```

## Channel Members Model
```sql
channel_members
- channel_id: uuid (FK -> channels.id)
- user_id: uuid (FK -> users.id)
- role: string (admin/member)
- joined_at: timestamp
PRIMARY KEY (channel_id, user_id)
```

## Message Model
```sql
messages
- id: uuid (PK)
- content: text
- sender_id: uuid (FK -> users.id)
- channel_id: uuid (FK -> channels.id, nullable)
- parent_id: uuid (FK -> messages.id, nullable for threads)
- is_direct_message: boolean
- created_at: timestamp
- updated_at: timestamp
```

## Direct Message Model
```sql
direct_messages
- message_id: uuid (FK -> messages.id)
- sender_id: uuid (FK -> users.id)
- recipient_id: uuid (FK -> users.id)
PRIMARY KEY (message_id)
```

## File Model
```sql
files
- id: uuid (PK)
- name: string
- url: string
- type: string
- size: number
- message_id: uuid (FK -> messages.id)
- uploaded_by: uuid (FK -> users.id)
- created_at: timestamp
```

## Emoji Reaction Model
```sql
reactions
- id: uuid (PK)
- message_id: uuid (FK -> messages.id)
- user_id: uuid (FK -> users.id)
- emoji: string
- created_at: timestamp
```

# Core Functionality Requirements

1. Implement real-time messaging using Supabase Realtime subscriptions for instant message delivery and updates
2. Set up WebSocket connections for user presence and typing indicators
3. Implement message threading with parent-child relationship tracking
4. Create file upload system using Supabase Storage with proper file type validation
5. Implement full-text search for messages and files using Supabase's search capabilities
6. Set up message pagination with infinite scroll for performance
7. Implement emoji reaction system with optimistic updates
8. Create real-time status update system for user presence

# Authorization Requirements (Supabase)

1. User Authentication:
```typescript
- Email/password authentication
- OAuth providers (Google, GitHub)
- JWT token management
- Session handling
```

2. Row Level Security (RLS):
```sql
-- Channels
ENABLE ROW LEVEL SECURITY ON channels;
CREATE POLICY "channel_access" ON channels
    USING (id IN (
        SELECT channel_id 
        FROM channel_members 
        WHERE user_id = auth.uid()
    ));

-- Messages
ENABLE ROW LEVEL SECURITY ON messages;
CREATE POLICY "message_access" ON messages
    USING (
        channel_id IN (
            SELECT channel_id 
            FROM channel_members 
            WHERE user_id = auth.uid()
        ) OR 
        id IN (
            SELECT message_id 
            FROM direct_messages 
            WHERE sender_id = auth.uid() 
            OR recipient_id = auth.uid()
        )
    );
```

3. Storage Rules:
```typescript
// File upload policies
storage.from('files').upload({
  bucketId: 'files',
  maxFileSize: 10000000, // 10MB
  allowedMimeTypes: ['image/*', 'application/pdf']
})
```

# Implementation Notes

1. Set up Next.js API routes for complex operations that require server-side logic
2. Use Docker for containerization:
```dockerfile
- Next.js application container
- Supabase local development container
- Redis container for caching (optional)
```

3. Create database indexes:
```sql
CREATE INDEX idx_messages_channel_id ON messages(channel_id);
CREATE INDEX idx_messages_parent_id ON messages(parent_id);
CREATE INDEX idx_channel_members_user_id ON channel_members(user_id);
CREATE INDEX idx_messages_content_search ON messages USING GIN (to_tsvector('english', content));
```

4. Set up WebSocket connections in Next.js:
```typescript
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Subscribe to real-time changes
const channel = supabase
  .channel('room1')
  .on('presence', { event: 'sync' }, () => {
    // Handle presence changes
  })
  .subscribe()
```

This architecture provides a solid foundation for building a scalable Slack clone with real-time capabilities while maintaining proper security and performance considerations.