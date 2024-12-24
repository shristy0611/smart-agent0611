import { GEMINI_CONFIG } from '../config/gemini';
import { formatResponse } from '../utils/languageUtils';

export async function callGeminiAPI(systemPrompt: string, message: string): Promise<string> {
  try {
    const response = await fetch(`${GEMINI_CONFIG.endpoint}?key=${GEMINI_CONFIG.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemPrompt}\n\nUser: ${message}`
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return formatResponse(data.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}