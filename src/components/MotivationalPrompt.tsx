
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

interface MotivationalPromptProps {
  lastTestDate: string; // expecting 'dd/mm/yyyy'
}

const MotivationalPrompt: React.FC<MotivationalPromptProps> = ({ lastTestDate }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [randomMessage, setRandomMessage] = useState('');

  const motivationalMessages = [
    'motivationalPrompt.message1',
    'motivationalPrompt.message2',
    'motivationalPrompt.message3',
    'motivationalPrompt.message4',
    'motivationalPrompt.message5',
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
    setRandomMessage(t(motivationalMessages[randomIndex]));
  }, [t]);

  const calculateDaysDifference = (dateString: string): number => {
    const parts = dateString.split('/');
    if (parts.length !== 3) return 0;
    
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JS Date
    const year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) return 0;

    const lastDate = new Date(year, month, day);
    const today = new Date();
    
    lastDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const differenceInTime = today.getTime() - lastDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    
    return differenceInDays;
  };

  const daysSinceLastTest = calculateDaysDifference(lastTestDate);
  const showRetakePrompt = daysSinceLastTest >= 14;

  const handleRetakeTest = () => {
    navigate('/diagnostic-test');
  };

  return (
    <div className="my-6 p-4 bg-animik-yellow/30 rounded-xl border border-yellow-300/50 animate-in fade-in duration-500">
      {showRetakePrompt ? (
        <div className="text-center">
          <p className="text-animik-dark text-base mb-4">
            {t('motivationalPrompt.retakePrompt')}
          </p>
          <button
            onClick={handleRetakeTest}
            className="py-2 px-5 bg-animik-lilac text-white font-semibold rounded-lg shadow-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 transform hover:scale-105"
          >
            {t('motivationalPrompt.retakeButton')}
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-3">
          <Sparkles className="w-6 h-6 text-orange-400 flex-shrink-0" />
          <p className="text-animik-dark italic text-sm">
            {randomMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default MotivationalPrompt;
