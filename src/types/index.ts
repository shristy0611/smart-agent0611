export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  isLoading?: boolean;
}

export type Language = 'en' | 'ja';

export interface Translations {
  chatHistory: string;
  typing: string;
  enterTopic: string;
  typeMessage: string;
  error: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  startChat: string;
}