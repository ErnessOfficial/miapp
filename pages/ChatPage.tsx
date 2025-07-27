
import React from 'react';
import ChatInterface from '../components/chat/ChatInterface';

const ChatPage: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-animik-gray p-0 sm:p-4">
      <ChatInterface />
    </div>
  );
};

export default ChatPage;
