
import { GoogleGenAI, Modality } from "@google/genai";
import { PRODUCT_MD_CONTENT } from "../constants";
import { Message, LocalContext } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getGullyResponse = async (
  history: Message[],
  userInput: string,
  context: LocalContext
) => {
  // Using Gemini 3 Flash for speed and reliability in a chat interface
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
    ${PRODUCT_MD_CONTENT}
    
    CRITICAL INSTRUCTIONS:
    - You are Kiro, a 28-year-old Bangalore native. 
    - You answer ONLY based on the local rules provided in the context or your street-smart persona.
    - CURRENT STATE: Area: ${context.area}, Time: ${context.time}, Weather: ${context.weather}.
    - STYLE: Casual, cynical but helpful, uses "macha", "guru", "scene illa", "adjust maadi".
    - BE HONEST: If traffic is bad, don't sugarcoat it. If street food is risky in rain, warn the user.
    - Keep responses concise and practical. No corporate fluff.
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
        temperature: 0.85,
        topK: 40,
        topP: 0.95,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Response Error:", error);
    return null;
  }
};

export const getKiroVoice = async (text: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Say with a cool, street-smart Bangalore swagger: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Zephyr' }, // Energetic and fitting for Kiro
          },
        },
      },
    });

    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
  } catch (error) {
    console.error("Kiro TTS Error:", error);
    return null;
  }
};
