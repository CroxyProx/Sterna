import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import ChatHeader from "@/components/chat/chat-header";
import ChatMessages from "@/components/chat/chat-messages";
import ChatInput from "@/components/chat/chat-input";
import type { Message } from "@shared/schema";

// Generate a session ID for this chat session
const generateSessionId = () => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export default function Chat() {
  const [sessionId] = useState(() => generateSessionId());
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  // Fetch messages for current session
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["/api/messages", sessionId],
    queryFn: async () => {
      const res = await fetch(`/api/messages/${sessionId}`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch messages");
      return res.json() as Promise<Message[]>;
    }
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      const res = await apiRequest("POST", "/api/messages", { content, sessionId });
      return res.json();
    },
    onMutate: () => {
      setIsTyping(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages", sessionId] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsTyping(false);
    }
  });

  // Clear conversation mutation
  const clearConversationMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("DELETE", `/api/messages/${sessionId}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages", sessionId] });
      toast({
        title: "Conversation cleared",
        description: "All messages have been removed.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: "Failed to clear conversation. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSendMessage = (content: string) => {
    if (!content.trim() || sendMessageMutation.isPending) return;
    sendMessageMutation.mutate(content.trim());
  };

  const handleClearConversation = () => {
    clearConversationMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen max-w-4xl mx-auto bg-card shadow-lg">
        <div className="flex items-center justify-center flex-1">
          <div className="bg-card rounded-xl p-8 shadow-lg border border-border text-center">
            <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
              <i className="fas fa-brain text-white text-2xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Initializing Sterna</h3>
            <p className="text-muted-foreground text-sm">Loading your conversation...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-card shadow-lg">
      <ChatHeader onClearConversation={handleClearConversation} />
      <ChatMessages messages={messages} isTyping={isTyping} />
      <ChatInput 
        onSendMessage={handleSendMessage}
        disabled={sendMessageMutation.isPending}
        messageCount={messages.length}
      />
    </div>
  );
}
