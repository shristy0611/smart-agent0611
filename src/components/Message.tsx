import React from 'react';
import { Message as MessageType } from '../types';
import { Loader2 } from 'lucide-react';

interface MessageProps {
  message: MessageType;
}

export function Message({ message }: MessageProps) {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        }`}
      >
        <div className="flex items-center gap-2">
          {message.isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {message.text}
        </div>
      </div>
    </div>
  );
}