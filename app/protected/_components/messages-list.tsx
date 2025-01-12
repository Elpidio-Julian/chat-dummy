"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

// Adjust fields to match your messages table columns
interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  channel_id: string;
}

export default function MessagesList({
  channelId,
  initialMessages,
}: {
  channelId: string;
  initialMessages: Message[];
}) {
  const supabase = createClient();
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  useEffect(() => {
    // Join a Supabase Realtime channel for messages
    // Filter for INSERT events on the "messages" table
    const channel = supabase
      .channel(`realtime:channel:${channelId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload: any) => {
          if (payload.new.channel_id === channelId) {
            setMessages((prev) => [...prev, payload.new]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [channelId, supabase]);

  return (
    <div className="flex flex-col gap-2">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="border border-foreground/10 p-3 rounded shadow-sm"
        >
          <p className="text-sm font-medium">User: {msg.sender_id}</p>
          <p>{msg.content}</p>
          <p className="text-xs text-foreground/50">
            {new Date(msg.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
} 