import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema, type Message } from "@shared/schema";
import { generateChatResponse } from "./openai";
import { z } from "zod";

const sendMessageSchema = z.object({
  content: z.string().min(1).max(5000),
  sessionId: z.string().min(1),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Get messages for a session
  app.get("/api/messages/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const messages = await storage.getMessages(sessionId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // Send a message and get AI response
  app.post("/api/messages", async (req, res) => {
    try {
      const { content, sessionId } = sendMessageSchema.parse(req.body);
      
      // Save user message
      const userMessage = await storage.createMessage({
        content,
        role: "user",
        sessionId,
      });

      // Get conversation history for context
      const conversationHistory = await storage.getMessages(sessionId);
      
      // Prepare messages for OpenAI (excluding the just-added user message to avoid duplication)
      const chatMessages = conversationHistory
        .slice(0, -1) // Remove the last message (just added)
        .map(msg => ({
          role: msg.role as "user" | "assistant",
          content: msg.content
        }));
      
      // Add the current user message
      chatMessages.push({ role: "user", content });

      // Generate AI response
      const aiResponse = await generateChatResponse(chatMessages);
      
      // Save AI response
      const aiMessage = await storage.createMessage({
        content: aiResponse,
        role: "assistant", 
        sessionId,
      });

      res.json({ userMessage, aiMessage });
    } catch (error) {
      console.error("Error processing message:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to process message" });
      }
    }
  });

  // Clear conversation
  app.delete("/api/messages/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      await storage.clearMessages(sessionId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error clearing messages:", error);
      res.status(500).json({ error: "Failed to clear messages" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
