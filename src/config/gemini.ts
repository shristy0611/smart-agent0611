export const GEMINI_CONFIG = {
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
  endpoint: 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent'
};