import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize Gemini Client
// Note: process.env.API_KEY is injected by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are an expert, friendly, and enthusiastic AI Travel Assistant named "Travel Buddy".
Your goal is to help users plan trips, find destinations, suggest itineraries, and give travel tips.
Keep your responses concise, visually organized (use emojis), and encouraging.
The user is using a Chinese language interface, so please reply in Chinese.
`;

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[] = []
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // We use generateContent for a single turn here for simplicity in this demo structure,
    // but in a real chat app, you might maintain the chat session object.
    // To simulate chat history, we could construct the prompt or use chat.sendMessage.
    
    // For this implementation, we will use the Chat API to maintain context if we were persisting it,
    // but here we will just create a new chat for the immediate response to ensure robustness.
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history, 
    });

    const result: GenerateContentResponse = await chat.sendMessage({
      message: message
    });

    return result.text || "抱歉，我现在无法回答。请稍后再试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "抱歉，连接 AI 服务时出现错误。请检查您的网络连接。";
  }
};
