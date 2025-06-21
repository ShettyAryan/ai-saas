import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generatePdfSummaryFromGemini = async (pdfText: string) => {
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: SUMMARY_SYSTEM_PROMPT,
            },
            {
              text: `Transfrom this document into an engaging, easy to read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
            },
          ],
        },
      ],
      config: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });

    if (!response.text) {
      throw new Error("Empty response from Gemini API");
    }
    return response.text;
  } catch (error: any) {
    if (error?.status === 429) {
      throw new Error("RATE_LIMIT_EXCEEDED");
    }
    console.error("Gemini API Error:", error);
    throw error;
  }
};
