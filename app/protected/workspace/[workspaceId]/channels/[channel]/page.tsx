import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import MessageInput from "@/app/protected/_components/message-input";
import MessagesList from "@/app/protected/_components/messages-list";

export default async function ChannelPage({
  params,
}: {
  params: { workspaceId: string; channelId: string };
}) {
  const supabase = await createClient();

  // 1. Validate the channel belongs to the given workspace
  const { data: channelData, error: channelError } = await supabase
    .from("channels")
    .select("id, name")
    .match({ id: params.channelId, workspace_id: params.workspaceId })
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
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold mb-2">#{channelData.name}</h1>
      <MessagesList
        channelId={channelData.id}
        initialMessages={messages || []}
      />
      <MessageInput channelId={channelData.id} />
    </div>
  );
}