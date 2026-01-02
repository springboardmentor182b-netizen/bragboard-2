import { GoogleGenAI, Type } from "@google/genai";

// Standardizing on Gemini 3 Flash for performance and reasoning
const MODEL_NAME = 'gemini-3-flash-preview';

const getAIClient = () => {
  // Use named parameter initialization as required
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const analyzeSentiment = async (text: string) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [{ parts: [{ text: `Analyze the sentiment of the following employee message. Provide a score from 0 (negative) to 100 (positive) and a short one-word mood: "${text}"` }] }],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            mood: { type: Type.STRING },
            summary: { type: Type.STRING }
          },
          required: ['score', 'mood', 'summary']
        }
      }
    });
    // Use the .text property directly (not a method)
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error('Sentiment Analysis Error:', error);
    return { score: 50, mood: 'Neutral', summary: 'System unable to verify sentiment at this time.' };
  }
};

export const checkToxicContent = async (text: string) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [{ parts: [{ text: `Evaluate this text for corporate toxicity, harassment, or non-professional behavior: "${text}".` }] }],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isToxic: { type: Type.BOOLEAN },
            reason: { type: Type.STRING }
          },
          required: ['isToxic', 'reason']
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error('Toxic Check Error:', error);
    return { isToxic: false, reason: '' };
  }
};

export const getRecognitionRecommendations = async (employeeData: string) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [{ parts: [{ text: `Based on these activities, suggest who should be recognized. DATA: ${employeeData}` }] }],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              employeeName: { type: Type.STRING },
              reason: { type: Type.STRING },
              badgeSuggested: { type: Type.STRING }
            },
            required: ['employeeName', 'reason', 'badgeSuggested']
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error('Recommendations Error:', error);
    return [];
  }
};

export const analyzeBurnoutRisk = async (activityLog: string) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [{ parts: [{ text: `Scan for burnout indicators (late work, reduced engagement): ${activityLog}` }] }],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskLevel: { type: Type.STRING },
            indicators: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendation: { type: Type.STRING }
          },
          required: ['riskLevel', 'indicators', 'recommendation']
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error('Burnout Analysis Error:', error);
    return { riskLevel: 'Unknown', indicators: [], recommendation: 'Verification failed.' };
  }
};