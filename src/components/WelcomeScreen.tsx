import React from 'react';
import { MessageSquareText } from 'lucide-react';
import { Language, Translations } from '../types';

interface WelcomeScreenProps {
  translations: Translations;
  onStart: () => void;
}

export function WelcomeScreen({ translations, onStart }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <MessageSquareText className="w-16 h-16 text-blue-500" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome to Smart Agent
          </h1>
          <h2 className="text-2xl font-bold text-gray-700">
            スマートエージェントへようこそ
          </h2>
        </div>
        <div className="space-y-1">
          <p className="text-gray-600">
            Type in English or Japanese to start
          </p>
          <p className="text-gray-600">
            英語または日本語で入力してください
          </p>
        </div>
        <button
          onClick={onStart}
          className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Chat / チャットを開始
        </button>
      </div>
    </div>
  );
}