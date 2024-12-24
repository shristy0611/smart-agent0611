import React, { KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSend: () => void;
}

export function ChatInput({ message, setMessage, onSend }: ChatInputProps) {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <div className="max-w-4xl mx-auto flex gap-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message... / メッセージを入力..."
          className="flex-1 resize-none rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={1}
        />
        <button
          onClick={onSend}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>Send / 送信</span>
        </button>
      </div>
    </div>
  );
}