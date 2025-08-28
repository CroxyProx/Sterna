import { GoogleGenAI } from "@google/genai";

// Using Google's Gemini API for free AI responses
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "" });

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function generateChatResponse(messages: ChatMessage[]): Promise<string> {
  try {
    // Convert messages to Gemini format - Gemini doesn't use system messages the same way
    const systemPrompt = "You are Sterna, an intelligent AI assistant created by Lumen. You are helpful, knowledgeable, and friendly. Provide clear, accurate, and engaging responses.";
    
    // Build conversation context
    let conversationContext = systemPrompt + "\n\n";
    messages.forEach(msg => {
      if (msg.role === "user") {
        conversationContext += `Human: ${msg.content}\n\n`;
      } else if (msg.role === "assistant") {
        conversationContext += `Sterna: ${msg.content}\n\n`;
      }
    });
    
    // Get the latest user message
    const latestMessage = messages[messages.length - 1];
    const prompt = conversationContext + `Human: ${latestMessage.content}\n\nSterna:`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text || "I apologize, but I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to generate AI response. Please try again later.");
  }
}
