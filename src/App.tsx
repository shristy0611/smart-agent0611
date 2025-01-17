import { useState } from 'react';
import { ChatWindow } from './components/ChatWindow';
import { ChatInput } from './components/ChatInput';
import { AdvisorSelector } from './components/AdvisorSelector';
import { LanguageSelector } from './components/LanguageSelector';
import { callGeminiAPI } from './services/geminiApi';
import { Message } from './types';
import { AdvisorType, advisors } from './types/advisors';
import { translations } from './translations';
import { useLanguage } from './LanguageContext';

export default function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedAdvisor, setSelectedAdvisor] = useState<AdvisorType>('general');
  const { language } = useLanguage();
  const t = translations[language];

  const handleAdvisorChange = (newAdvisor: AdvisorType) => {
    const advisor = advisors.find(a => a.id === newAdvisor);
    if (!advisor) return;

    setSelectedAdvisor(newAdvisor);
    setMessages([]);
    
    const advisorName = language === 'ja' ? advisor.nameJa : advisor.nameEn;
    const changeMessage = t.advisorChanged(advisorName);
    
    setMessages([{
      id: Date.now(),
      text: changeMessage,
      sender: 'system'
    }]);
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: message,
      sender: 'user',
    };

    const loadingMessage: Message = {
      id: Date.now() + 1,
      text: t.thinking,
      sender: 'bot',
      isLoading: true,
    };

    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setMessage('');

    try {
      const advisor = advisors.find(a => a.id === selectedAdvisor);
      if (!advisor) throw new Error('Advisor not found');
      
      const botResponse = await callGeminiAPI(advisor.systemPrompt, message, language);
      
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessage.id
          ? { ...msg, text: botResponse, isLoading: false }
          : msg
      ));
    } catch (error) {
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessage.id
          ? { ...msg, text: t.error, isLoading: false }
          : msg
      ));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
            <LanguageSelector />
          </div>
        </div>
      </div>
      <AdvisorSelector 
        advisors={advisors}
        selectedAdvisor={selectedAdvisor}
        onSelect={handleAdvisorChange}
        userLanguage={language}
      />
      <ChatWindow messages={messages} />
      <ChatInput
        message={message}
        setMessage={setMessage}
        onSend={handleSend}
        placeholder={t.typeMessage}
      />
    </div>
  );
}