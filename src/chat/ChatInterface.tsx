
import React, { useState, useEffect } from 'react';
import { ChatMessage } from '../types';
import ChatWindow from './ChatWindow';
import CalmingModal from './CalmingModal';
import { Bot, Send, Sparkles, Leaf } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ChatInterface: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsTyping(true);
    setTimeout(() => {
        setMessages([
          {
            id: 'welcome-1',
            text: t('chat.welcomeMessage'),
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        setIsTyping(false);
    }, 1000);
  }, [t]);

  const simulateBotResponse = (userMessage: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const botResponseText = t('chat.simulatedResponse');
      
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if(e) e.preventDefault();
    if (input.trim() === '') return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    simulateBotResponse(input);
  };
  
  const handlePromptClick = (prompt: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: prompt,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMessage]);
    simulateBotResponse(prompt);
  };

  const handleTechniqueSelect = (technique: 'breathing' | 'grounding') => {
    setIsModalOpen(false);
    setIsTyping(true);

    const steps = t(`chat.techniqueSteps.${technique}`, { returnObjects: true }) as string[];
    
    let delay = 500;
    steps.forEach((step, index) => {
        delay += 1500 + Math.random() * 1000;
        setTimeout(() => {
            const botMessage: ChatMessage = {
                id: `bot-tech-${Date.now()}-${index}`,
                text: step,
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, botMessage]);

            if(index === steps.length - 1) {
                setIsTyping(false);
            }
        }, delay);
    });
  };

  const guidedPrompts = [
    t('chat.guidedPrompts.anxious'),
    t('chat.guidedPrompts.sad'),
    t('chat.guidedPrompts.overwhelmed')
  ];

  return (
    <div className="flex flex-col w-full max-w-4xl h-full bg-white sm:rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white/80 backdrop-blur-sm z-10">
            <div className="flex items-center space-x-3">
                <div className="relative">
                    <Bot className="w-10 h-10 text-animik-lilac" />
                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"></span>
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-animik-dark">{t('chat.botName')}</h2>
                    <p className="text-sm text-gray-500">{t('chat.status')}</p>
                </div>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="p-2 rounded-full hover:bg-animik-sky/20 transition-colors" aria-label={t('chat.calmingTechniques')}>
                <Leaf className="w-6 h-6 text-animik-lilac" />
            </button>
        </div>

        <ChatWindow messages={messages} isTyping={isTyping} />

        <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
                <Sparkles className="w-5 h-5 text-animik-peach flex-shrink-0 ml-1" />
                {guidedPrompts.map(prompt => (
                    <button key={prompt} onClick={() => handlePromptClick(prompt)} className="flex-shrink-0 px-3 py-1.5 text-sm bg-animik-gray hover:bg-animik-sky/30 text-animik-dark rounded-full transition-colors">
                        {prompt}
                    </button>
                ))}
            </div>
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t('chat.inputPlaceholder')}
                    className="flex-grow w-full px-4 py-2 bg-animik-gray border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-animik-lilac"
                    aria-label="Chat message input"
                />
                <button type="submit" className="bg-animik-lilac text-white p-3 rounded-full hover:bg-purple-500 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-gray-300 disabled:cursor-not-allowed" disabled={!input.trim() || isTyping}>
                    <Send className="w-5 h-5" />
                </button>
            </div>
        </form>
        
        <CalmingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSelect={handleTechniqueSelect} />
    </div>
  );
};

export default ChatInterface;
