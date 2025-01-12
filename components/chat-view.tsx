import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from 'lucide-react'

export default function ChatView() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold"># general</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {/* Message list would go here */}
        <p className="text-sm text-muted-foreground">No messages yet.</p>
      </div>
      <div className="border-t p-4">
        <form className="flex items-center space-x-2">
          <Input className="flex-1" placeholder="Type a message..." />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
}

