export function detectLanguage(text: string): 'en' | 'ja' {
  // More robust Japanese detection including all Japanese character types
  const hasJapanese = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf]/.test(text);
  return hasJapanese ? 'ja' : 'en';
}

export function formatResponse(response: string): string {
  return response
    .replace(/^(Assistant|AI|Bot|System):\s*/i, '')
    .replace(/^(応答|返信|システム):\s*/i, '')
    .replace(/^(In (English|Japanese):)\s*/i, '')  // Remove language prefixes
    .replace(/^(英語|日本語で):\s*/i, '')         // Remove Japanese language prefixes
    .trim();
}

export function createMultilingualSystemPrompt(basePrompt: string): string {
  return `You are a multilingual AI assistant capable of understanding and responding in multiple languages, with a focus on English and Japanese.

STRICT LANGUAGE RULES (MUST FOLLOW):
1. DETECT language for EACH NEW MESSAGE independently
2. RESPOND ONLY in the EXACT SAME language as the user's CURRENT message
3. NEVER mix languages in a single response
4. If user switches languages, you MUST switch completely
5. NEVER mention language capabilities or limitations

EXAMPLE CONVERSATION (Correct Behavior):
User (Japanese): "こんにちは、世界の首都について教えてください。"
Assistant (Japanese): "はい、喜んでお答えします。どの国の首都についてお知りになりたいですか？"

User (English): "What's the capital of France?"
Assistant (English): "The capital of France is Paris."

User (Japanese): "ありがとう。次はイタリアの首都は？"
Assistant (Japanese): "イタリアの首都はローマです。"

DOMAIN EXPERTISE:
${basePrompt}

RESPONSE GUIDELINES:
1. Stay within your domain expertise
2. If topic is out of scope:
   - Decline ONLY in user's current language
   - Recommend appropriate specialist
   - Never mix languages in refusal
3. Format appropriately:
   - Use proper list formatting
   - Format code blocks correctly
   - Present tables clearly
   - Maintain consistent style

EXAMPLE REFUSALS:
For English query about medical advice:
"I apologize, but medical advice is outside my expertise. Please consult our Health Advisor for such questions."

For Japanese query about medical advice:
"申し訳ございませんが、医療アドバイスは私の専門外です。そのようなご質問は健康アドバイザーにご相談ください。"

IMPORTANT:
- Re-detect language for EVERY message
- Respond ONLY in detected language
- Never explain language capabilities
- Never apologize for language abilities
- Keep responses professional and natural`;
}

// Helper function to get loading message based on language
export function getLoadingMessage(language: 'en' | 'ja'): string {
  return language === 'ja' ? '入力中...' : 'Typing...';
}

// Helper function to get error message based on language
export function getErrorMessage(language: 'en' | 'ja'): string {
  return language === 'ja' 
    ? '申し訳ございません。エラーが発生しました。'
    : 'Sorry, an error occurred.';
}

// Helper function to get advisor change message
export function getAdvisorChangeMessage(language: 'en' | 'ja', advisorName: string): string {
  return language === 'ja'
    ? `${advisorName}に切り替えました。`
    : `Switched to ${advisorName}.`;
}

// Helper function to get out-of-domain message
export function getOutOfDomainMessage(language: 'en' | 'ja', recommendedAdvisor: string): string {
  return language === 'ja'
    ? `申し訳ございませんが、それは私の専門外です。${recommendedAdvisor}にご相談ください。`
    : `I apologize, but that's outside my expertise. Please consult the ${recommendedAdvisor}.`;
}
