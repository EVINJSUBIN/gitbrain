import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini AI client
// It will automatically pick up process.env.GEMINI_API_KEY
export const ai = new GoogleGenAI({});
