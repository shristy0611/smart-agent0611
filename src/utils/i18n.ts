import { Language, Translations } from '../types';

export const translations: Record<Language, Translations> = {
  en: {
    chatHistory: 'Chat History',
    typing: 'Typing...',
    enterTopic: 'Enter topic...',
    typeMessage: 'Type your message...',
    error: 'Sorry, I encountered an error processing your request.',
    welcomeTitle: 'Welcome to Smart Agent',
    welcomeSubtitle: 'Type in English or Japanese to start',
    startChat: 'Start Chat'
  },
  ja: {
    chatHistory: 'チャット履歴',
    typing: '入力中...',
    enterTopic: 'トピックを入力...',
    typeMessage: 'メッセージを入力...',
    error: '申し訳ありません。リクエストの処理中にエラーが発生しました。',
    welcomeTitle: 'スマートエージェントへようこそ',
    welcomeSubtitle: '英語または日本語で入力してください',
    startChat: 'チャットを開始'
  }
};

export const detectLanguage = (text: string): Language => {
  // Simple detection: if the text contains Japanese characters, return 'ja'
  return /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf]/.test(text)
    ? 'ja'
    : 'en';
};