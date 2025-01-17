import { Dispatch, SetStateAction } from 'react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

interface ChatInputProps {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  onSend: () => void;
  placeholder?: string;
}

export function ChatInput({ message, setMessage, onSend, placeholder = 'Type your message...' }: ChatInputProps) {
  const { language } = useLanguage();
  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend();
  };

  return (
    <div className="border-t bg-white p-4">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-4 pr-24 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t.send}
          </button>
        </form>
      </div>
    </div>
  );
}