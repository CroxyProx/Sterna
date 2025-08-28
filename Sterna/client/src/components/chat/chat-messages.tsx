import { useEffect, useRef } from "react";
import { Bot } from "lucide-react";
import MessageBubble from "./message-bubble";
import type { Message } from "@shared/schema";

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
}

export default function ChatMessages({ messages, isTyping }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <main ref={containerRef} className="flex-1 overflow-y-auto chat-scrollbar bg-secondary/30">
      <div className="p-4 sm:p-6 space-y-4">
        {messages.length === 0 && !isTyping && (
          <div className="flex justify-center">
            <div className="bg-card rounded-xl p-6 max-w-md text-center shadow-sm border border-border">
              <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="text-white text-xl" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2" data-testid="text-welcome-title">
                Welcome to Sterna
              </h3>
              <p className="text-muted-foreground text-sm" data-testid="text-welcome-description">
                Your intelligent AI assistant powered by Lumen. Ask me anything!
              </p>
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <MessageBubble key={message.id} message={message} index={index} />
        ))}

        {isTyping && (
          <div className="flex justify-start typing-indicator">
            <div className="flex space-x-3 max-w-xs sm:max-w-md">
              <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="text-white text-sm" size={16} />
              </div>
              <div className="bg-accent rounded-xl px-4 py-3 shadow-sm border border-border">
                <div className="flex space-x-1" data-testid="typing-indicator">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: "0.1s"}}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </main>
  );
}
