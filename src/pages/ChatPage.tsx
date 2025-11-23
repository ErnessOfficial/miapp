import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getRecaptchaToken } from '../recaptcha';

const ChatPage: React.FC = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setIsLoading(true);
    const token = await getRecaptchaToken('chat');
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, recaptchaToken: token })
      });
      const data = await response.json();
      if (response.ok) {
        setMessages(prev => [...prev, `You: ${input}`, `Bot: ${data.reply}`]);
        setInput('');
      } else {
        setMessages(prev => [...prev, `Error: ${data.error}`]);
      }
    } catch (err) {
      setMessages(prev => [...prev, t('chat.errorSending')]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="bg-white p-2 rounded shadow">{msg}</div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="flex mt-4">
        <input
          className="flex-1 border rounded px-2 py-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('chat.placeholder') || 'Type a message...'}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="ml-2 px-4 py-1 bg-animik-blue text-white rounded"
        >
          {isLoading ? t('chat.sending') : t('chat.send')}
        </button>
      </form>
    </div>
  );
};

export default ChatPage;

