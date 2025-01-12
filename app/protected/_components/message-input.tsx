"use client";

import { useState, FormEvent } from "react";
import { createClient } from "@/utils/supabase/client";

/**
 * Client Component:
 * Handles user input for sending new messages to a channel.
 */
export default function MessageInput({ channelId }: { channelId: string }) {
  const supabase = createClient();
  const [content, setContent] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) return;

    const { error } = await supabase.from("messages").insert([
      {
        content,
        channel_id: channelId,
        // You may want to add "sender_id" from the current user session
      },
    ]);

    if (error) {
      console.error("Error sending message:", error.message);
      return;
    }

    setContent(""); // clear input box
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        type="text"
        className="border border-foreground/20 p-2 rounded flex-1"
        placeholder="Type your message..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
      >
        Send
      </button>
    </form>
  );
} 