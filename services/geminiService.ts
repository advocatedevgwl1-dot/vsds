
import { GoogleGenAI } from "@google/genai";

export const getLegalAdvice = async (prompt: string, type: 'summary' | 'draft' | 'research', imageData?: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-2.5-flash-lite-latest'; // High speed, good for document OCR/analysis
  
  let systemInstruction = "You are 'Vidhigya AI', a legal expert. ";
  
  if (type === 'summary') {
    systemInstruction += "If an image is provided, perform OCR and summarize the legal document. Focus on parties involved, key dates, and the prayer/relief sought.";
  } else if (type === 'draft') {
    systemInstruction += "Create professional legal templates. If an image is provided, suggest improvements to the existing draft in the image.";
  } else {
    systemInstruction += "Perform deep research. Cite specific Indian statutes like BNS or BNSS.";
  }

  try {
    const parts: any[] = [{ text: prompt }];
    
    if (imageData) {
      parts.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: imageData.split(',')[1] // Remove the data:image/jpeg;base64, prefix
        }
      });
    }

    const response = await ai.models.generateContent({
      model: model,
      contents: { parts },
      config: {
        systemInstruction: systemInstruction,
        tools: [{ googleSearch: {} }]
      },
    });

    return {
      text: response.text || "I couldn't generate an analysis. Please check the document quality.",
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
