import { Bot } from "lucide-react";
import type { Message } from "@shared/schema";

interface MessageBubbleProps {
  message: Message;
  index: number;
}

export default function MessageBubble({ message, index }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const timestamp = message.createdAt ? 
    new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 
    "";

  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} message-enter`}
      style={{ animationDelay: `${index * 0.1}s` }}
      data-testid={`message-${message.role}-${index}`}
    >
      {isUser ? (
        <div className="bg-primary text-primary-foreground rounded-xl px-4 py-3 max-w-xs sm:max-w-md shadow-sm">
          <p className="text-sm sm:text-base whitespace-pre-wrap" data-testid={`text-user-message-${index}`}>
            {message.content}
          </p>
          {timestamp && (
            <div className="text-xs opacity-80 mt-1" data-testid={`text-timestamp-${index}`}>
              {timestamp}
            </div>
          )}
        </div>
      ) : (
        <div className="flex space-x-3 max-w-xs sm:max-w-md lg:max-w-lg">
          <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <Bot className="text-white text-sm" size={16} />
          </div>
          <div className="bg-accent rounded-xl px-4 py-3 shadow-sm border border-border">
            <div className="text-xs text-muted-foreground mb-2 font-medium">Sterna AI</div>
            <div className="prose prose-sm">
              <p className="text-sm sm:text-base text-foreground whitespace-pre-wrap" data-testid={`text-ai-message-${index}`}>
                {message.content}
              </p>
            </div>
            {timestamp && (
              <div className="text-xs text-muted-foreground mt-2" data-testid={`text-ai-timestamp-${index}`}>
                {timestamp}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
