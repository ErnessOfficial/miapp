// pages/ChatPage.tsx
import React, { useState, useEffect } from 'react';
import ChatInterface from '../components/chat/ChatInterface';
import { getRecaptchaToken } from '../recaptcha';

const ChatPage: React.FC = () => {
  const [recaptchaToken, setRecaptchaToken] = useState<string>('');
  const [recaptchaError, setRecaptchaError] = useState<string>('');

  // Obtain reCAPTCHA token for chat actions
  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await getRecaptchaToken('chat');
        setRecaptchaToken(token);
      } catch (err) {
        console.error('Error obtaining reCAPTCHA token:', err);
        setRecaptchaError('Error al cargar reCAPTCHA.');
      }
    };
    loadToken();
  }, []);

  if (recaptchaError) {
    return (
      <div className="w-full h-full flex items-center justify-center text-red-600">
        {recaptchaError}
      </div>
    );
  }

  // Show loading indicator until token is ready
  if (!recaptchaToken) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-600">
        Cargando chat…
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-animik-gray p-0 sm:p-4">
      <ChatInterface recaptchaToken={recaptchaToken} />
    </div>
  );
};

export default ChatPage;
