import React from 'react';
import { detectLanguage } from '../utils/languageUtils';

interface TopicNotificationProps {
  topic: string | null;
}

export function TopicNotification({ topic }: TopicNotificationProps) {
  let message: string;
  
  if (topic === null) {
    message = 'Topic removed / トピックが削除されました';
  } else {
    const language = detectLanguage(topic);
    message = language === 'ja'
      ? `トピックが「${topic}」に変更されました`
      : `Topic changed to "${topic}"`;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div 
        className={`
          bg-blue-100 text-blue-800 
          px-8 py-4 rounded-xl shadow-xl
          transform transition-all duration-500
          animate-fade-in
          text-lg
        `}
      >
        {message}
      </div>
    </div>
  );
}