import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import MessageInput from "@/app/protected/_components/message-input";
import MessagesList from "@/app/protected/_components/messages-list";
import ChatView from "@/components/chat-view";

export default async function ChannelPage({ params }: { params: Promise<{ workspaceId: string, channel: string }> }) {

  const supabase = await createClient();
  const { workspaceId, channel } = await params;

  // 1. Validate the channel belongs to the given workspace
  const { data: channelData, error: channelError } = await supabase
    .from("channels")
    .select("id, name")
    .match({ id: channel, workspace_id: workspaceId })
    .single();

  if (!channelData || channelError) {
    return notFound();
  }

  // 2. Fetch all messages for this channel
  const { data: messages, error: messagesError } = await supabase
    .from("messages")
    .select("*")
    .eq("channel_id", channelData.id)
    .order("created_at", { ascending: true });

  if (messagesError) {
    console.error("Failed to fetch messages:", messagesError.message);
  }

  return (
    <ChatView />
  );
}