
import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-end gap-2 justify-start">
      <div className="flex flex-col max-w-xs items-start">
        <div className="px-4 py-3 rounded-2xl shadow-sm bg-white text-animik-dark rounded-bl-none">
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
