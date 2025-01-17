export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot' | 'system';
  isLoading?: boolean;
}

export type Language = 'en' | 'ja';

interface TranslationStrings {
  // Header
  title: string;
  languageSelector: string;
  
  // Chat
  typeMessage: string;
  send: string;
  thinking: string;
  error: string;
  
  // Advisor Types
  general: string;
  career: string;
  health: string;
  finance: string;
  education: string;
  
  // Messages
  advisorChanged: (advisor: string) => string;
}

export type Translations = {
  [key in Language]: TranslationStrings;
};