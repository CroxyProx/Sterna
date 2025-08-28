import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
  messageCount: number;
}

export default function ChatInput({ onSendMessage, disabled, messageCount }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [message]);

  const handleSend = () => {
    if (!message.trim() || disabled) return;
    onSendMessage(message);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <footer className="border-t border-border bg-card p-4 sm:p-6">
      <div className="flex space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full resize-none border border-input bg-input rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors pr-12"
              placeholder="Ask Sterna anything..."
              rows={1}
              disabled={disabled}
              data-testid="input-message"
            />
            <div className="absolute right-2 bottom-2 flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors w-8 h-8"
                data-testid="button-attach-file"
              >
                <Paperclip size={16} />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span data-testid="text-input-hint">Press Enter to send, Shift+Enter for new line</span>
            <span data-testid="text-message-count">{messageCount} messages</span>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <Button
            onClick={handleSend}
            disabled={disabled || !message.trim()}
            className="gradient-bg text-primary-foreground rounded-xl px-6 py-3 font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="button-send"
          >
            <Send size={18} />
            <span className="hidden sm:inline ml-2">Send</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground p-2 rounded-lg transition-colors text-xs"
            data-testid="button-stop"
          >
            <Square size={14} className="mr-1" />
            <span className="hidden sm:inline">Stop</span>
          </Button>
        </div>
      </div>
    </footer>
  );
}
