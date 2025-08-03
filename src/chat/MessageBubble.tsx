
import React from 'react';
import { ChatMessage } from '../types';

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex items-end gap-2 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex flex-col max-w-xs md:max-w-md lg:max-w-lg ${isBot ? 'items-start' : 'items-end'}`}>
        <div
          className={`px-4 py-3 rounded-2xl shadow-sm ${
            isBot
              ? 'bg-white text-animik-dark rounded-bl-none'
              : 'bg-animik-lilac text-white rounded-br-none'
          }`}
        >
          <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{message.text}</p>
        </div>
        <span className="text-xs text-gray-400 mt-1 px-1">{message.timestamp}</span>
      </div>
    </div>
  );
};

export default MessageBubble;
