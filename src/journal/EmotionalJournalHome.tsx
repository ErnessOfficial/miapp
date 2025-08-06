
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserContext';
import { Feather, Coffee } from 'lucide-react';

interface EmotionalJournalHomeProps {
  onStart: () => void;
}

const EmotionalJournalHome: React.FC<EmotionalJournalHomeProps> = ({ onStart }) => {
  const { t } = useTranslation();
  const { user } = useUser();
  const [showPauseMessage, setShowPauseMessage] = useState(false);

  const handleNotToday = () => {
    setShowPauseMessage(true);
  };

  return (
    <div className="text-center p-4 sm:p-8 animate-in fade-in duration-500">
      <h2 className="text-2xl font-semibold text-animik-dark mb-2">
        {t('writingMyStory.welcome', { name: user?.fullName || 'tú' })}
      </h2>
      <p className="text-gray-500 mb-8">{t('writingMyStory.safeSpace')}</p>
      
      {!showPauseMessage ? (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onStart}
            className="flex-1 flex items-center justify-center gap-3 py-4 px-6 bg-animik-lilac text-white font-semibold rounded-lg shadow-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 transform hover:scale-105"
          >
            <Feather className="w-5 h-5" />
            <span>{t('writingMyStory.writeToday')}</span>
          </button>
          <button
            onClick={handleNotToday}
            className="flex-1 flex items-center justify-center gap-3 py-4 px-6 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all duration-300"
          >
            <Coffee className="w-5 h-5" />
            <span>{t('writingMyStory.notToday')}</span>
          </button>
        </div>
      ) : (
        <div className="bg-animik-sky/20 p-6 rounded-xl text-center animate-in fade-in">
          <p className="text-animik-dark text-base mb-6">
            {t('writingMyStory.comeBackLater')}
          </p>
          <button
            onClick={() => setShowPauseMessage(false)}
            className="py-2 px-5 bg-white border border-animik-lilac text-animik-lilac font-semibold rounded-lg shadow-sm hover:bg-animik-lilac/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300"
          >
            {t('writingMyStory.returnLater')}
          </button>
        </div>
      )}
    </div>
  );
};

export default EmotionalJournalHome;
