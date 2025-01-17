import { Translations } from '../types';

export const translations: Translations = {
  en: {
    // Header
    title: 'AI Smart Agent',
    languageSelector: 'Language',
    
    // Chat
    typeMessage: 'Type your message...',
    send: 'Send',
    thinking: 'Thinking...',
    error: 'An error occurred. Please try again.',
    
    // Advisor Types
    general: 'General Assistant',
    career: 'Career Advisor',
    health: 'Health Advisor',
    finance: 'Financial Advisor',
    education: 'Education Advisor',
    
    // Messages
    advisorChanged: (advisor: string) => `Switched to ${advisor}`,
  },
  ja: {
    // Header
    title: 'AIスマートエージェント',
    languageSelector: '言語',
    
    // Chat
    typeMessage: 'メッセージを入力...',
    send: '送信',
    thinking: '考え中...',
    error: 'エラーが発生しました。もう一度お試しください。',
    
    // Advisor Types
    general: '一般アシスタント',
    career: 'キャリアアドバイザー',
    health: '健康アドバイザー',
    finance: 'ファイナンシャルアドバイザー',
    education: '教育アドバイザー',
    
    // Messages
    advisorChanged: (advisor: string) => `${advisor}に切り替えました`,
  }
}; 