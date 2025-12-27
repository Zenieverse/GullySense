
import { GoogleGenAI } from "@google/genai";
import { PRODUCT_MD_CONTENT } from "../constants";
import { Message, LocalContext } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getGullyResponse = async (
  history: Message[],
  userInput: string,
  context: LocalContext
) => {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
    ${PRODUCT_MD_CONTENT}
    
    Current User Context:
    Location: ${context.area}
    Time: ${context.time}
    Weather: ${context.weather}
    
    You must strictly follow the rules in the context. 
    Be short, confident, and speak like a local (Kiro).
    Do not use formal tourist language.
    If there is a conflict between internet facts and the local context provided, trust the local context.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        ...history.map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        })),
        { role: 'user', parts: [{ text: userInput }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Arrey guru, some scene with the server. Try again swalpa later?";
  }
};
