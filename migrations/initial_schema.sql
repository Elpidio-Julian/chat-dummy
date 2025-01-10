-- Enable UUID generation (for local development).
-- Some Supabase projects already have this enabled by default.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--------------------------------------------------------------------------------
-- USERS (Optional local table if not relying on Supabase Auth users table).
-- If you rely on Supabase's auth.users, you can skip creating your own "users" table.
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email         TEXT UNIQUE NOT NULL,
  username      TEXT NOT NULL,
  full_name     TEXT,
  avatar_url    TEXT,
  status_message TEXT,
  is_online     BOOLEAN DEFAULT FALSE,
  last_seen     TIMESTAMP WITH TIME ZONE,
  created_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- WORKSPACES
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS workspaces (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  description TEXT,
  created_by  UUID REFERENCES users (id) ON DELETE SET NULL,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- WORKSPACE MEMBERS
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS workspace_members (
  workspace_id UUID NOT NULL REFERENCES workspaces (id) ON DELETE CASCADE,
  user_id      UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  role         TEXT NOT NULL DEFAULT 'member',   -- e.g. admin, moderator, member
  joined_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_banned    BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (workspace_id, user_id)
);

--------------------------------------------------------------------------------
-- CHANNELS
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS channels (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces (id) ON DELETE CASCADE,
  name         TEXT NOT NULL,
  description  TEXT,
  is_private   BOOLEAN DEFAULT FALSE,
  created_by   UUID REFERENCES users (id) ON DELETE SET NULL,
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- CHANNEL MEMBERS
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS channel_members (
  channel_id UUID NOT NULL REFERENCES channels (id) ON DELETE CASCADE,
  user_id    UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  role       TEXT NOT NULL DEFAULT 'member', -- e.g. admin, member
  joined_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (channel_id, user_id)
);

--------------------------------------------------------------------------------
-- MESSAGES
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS messages (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content          TEXT NOT NULL,
  sender_id        UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  channel_id       UUID REFERENCES channels (id) ON DELETE CASCADE,
  parent_id        UUID REFERENCES messages (id) ON DELETE CASCADE,
  is_direct_message BOOLEAN DEFAULT FALSE,
  created_at       TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at       TIMESTAMP WITH TIME ZONE
);

--------------------------------------------------------------------------------
-- DIRECT MESSAGES
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS direct_messages (
  message_id  UUID PRIMARY KEY REFERENCES messages (id) ON DELETE CASCADE,
  sender_id   UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE
);

--------------------------------------------------------------------------------
-- FILES
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS files (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  url         TEXT NOT NULL,
  type        TEXT,
  size        BIGINT,
  message_id  UUID REFERENCES messages (id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES users (id) ON DELETE SET NULL,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- REACTIONS
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS reactions (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message_id UUID NOT NULL REFERENCES messages (id) ON DELETE CASCADE,
  user_id    UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  emoji      TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- Indexes
--------------------------------------------------------------------------------
-- Messages
CREATE INDEX IF NOT EXISTS idx_messages_channel_id
  ON messages (channel_id);

CREATE INDEX IF NOT EXISTS idx_messages_parent_id
  ON messages (parent_id);

CREATE INDEX IF NOT EXISTS idx_messages_content_search
  ON messages
  USING GIN (to_tsvector('english', content));

-- Channel Members
CREATE INDEX IF NOT EXISTS idx_channel_members_user_id
  ON channel_members (user_id);

-- (Optionally) if you rely on text lookups for channels.
CREATE INDEX IF NOT EXISTS idx_channels_name
  ON channels (name); 