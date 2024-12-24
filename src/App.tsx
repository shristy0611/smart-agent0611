import React, { useState } from 'react';
import { ChatWindow } from './components/ChatWindow';
import { ChatInput } from './components/ChatInput';
import { WelcomeScreen } from './components/WelcomeScreen';
import { AdvisorSelector } from './components/AdvisorSelector';
import { callGeminiAPI } from './services/geminiApi';
import { Message } from './types';
import { AdvisorType, advisors } from './types/advisors';
import { 
  detectLanguage, 
  getLoadingMessage, 
  getErrorMessage, 
  getAdvisorChangeMessage 
} from './utils/languageUtils';

export default function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedAdvisor, setSelectedAdvisor] = useState<AdvisorType>('general');
  const [userLanguage, setUserLanguage] = useState<'en' | 'ja'>('en');

  const handleAdvisorChange = (newAdvisor: AdvisorType) => {
    const advisor = advisors.find(a => a.id === newAdvisor);
    if (!advisor) return;

    setSelectedAdvisor(newAdvisor);
    setMessages([]);
    
    // Show advisor change message in current language
    const advisorName = userLanguage === 'ja' ? advisor.nameJa : advisor.nameEn;
    const changeMessage = getAdvisorChangeMessage(userLanguage, advisorName);
    
    setMessages([{
      id: Date.now(),
      text: changeMessage,
      sender: 'system'
    }]);
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    // Detect language from current message independently
    const currentLanguage = detectLanguage(message);
    setUserLanguage(currentLanguage);

    const userMessage: Message = {
      id: Date.now(),
      text: message,
      sender: 'user',
    };

    const loadingMessage: Message = {
      id: Date.now() + 1,
      text: getLoadingMessage(currentLanguage),
      sender: 'bot',
      isLoading: true,
    };

    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setMessage('');

    try {
      const advisor = advisors.find(a => a.id === selectedAdvisor);
      if (!advisor) throw new Error('Advisor not found');
      
      const botResponse = await callGeminiAPI(advisor.systemPrompt, message);
      
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessage.id
          ? { ...msg, text: botResponse, isLoading: false }
          : msg
      ));
    } catch (error) {
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessage.id
          ? { ...msg, text: getErrorMessage(currentLanguage), isLoading: false }
          : msg
      ));
    }
  };

  if (showWelcome) {
    return (
      <WelcomeScreen onStart={() => setShowWelcome(false)} />
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <AdvisorSelector 
        advisors={advisors}
        selectedAdvisor={selectedAdvisor}
        onSelect={handleAdvisorChange}
        userLanguage={userLanguage}
      />
      <ChatWindow messages={messages} />
      <ChatInput
        message={message}
        setMessage={setMessage}
        onSend={handleSend}
      />
    </div>
  );
}