
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';

interface TestClosingMessageProps {
  onContinue: () => void;
}

const TestClosingMessage: React.FC<TestClosingMessageProps> = ({ onContinue }) => {
  const { t } = useTranslation();

  // For future potential: The message content could be personalized by an AI
  // based on the user's response patterns or tone analysis during the test.

  return (
    <div className="min-h-full bg-gradient-to-br from-animik-sky/20 to-animik-peach/20 p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-2xl text-center transform transition-all duration-500 animate-in fade-in zoom-in-95">
        <Heart className="w-16 h-16 mx-auto text-animik-pink mb-6" />
        <div className="space-y-4 text-gray-600">
          <p>{t('diagnosticTest.closingMessage.line1')}</p>
          <p>{t('diagnosticTest.closingMessage.line2')}</p>
          <p>{t('diagnosticTest.closingMessage.line3')}</p>
          <p className="font-semibold text-animik-dark pt-2">{t('diagnosticTest.closingMessage.line4')}</p>
        </div>
        <button
          onClick={onContinue}
          className="mt-8 w-full py-3 px-6 bg-animik-lilac text-white font-semibold rounded-lg shadow-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300"
        >
          {t('diagnosticTest.closingMessage.button')}
        </button>
      </div>
    </div>
  );
};

export default TestClosingMessage;
