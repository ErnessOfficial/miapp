
import React from 'react';
import { useUser } from '../../context/UserContext';
import MoodTrackerWidget from '../components/MoodTrackerWidget';
import PersonalizedRecommendations from '../components/PersonalizedRecommendations';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { user, showWisdomDropNotification, setShowWisdomDropNotification } = useUser();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleReadWisdomDrop = () => {
    setShowWisdomDropNotification(false);
    navigate('/wisdom-drops');
  };

  return (
    <div>
      {showWisdomDropNotification && (
        <div className="mb-6 p-4 bg-animik-sky/30 border border-animik-sky rounded-xl flex items-center justify-between animate-in fade-in duration-500">
          <p className="text-animik-dark text-sm sm:text-base">
            {t('dashboard.wisdomDropNotification')}
          </p>
          <button
            onClick={handleReadWisdomDrop}
            className="flex-shrink-0 ml-4 py-2 px-4 bg-white border border-animik-lilac text-animik-lilac font-semibold rounded-lg shadow-sm hover:bg-animik-lilac/10 transition-colors"
          >
            {t('dashboard.readNow')}
          </button>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-animik-dark">
          {t('dashboard.greeting', { name: user?.fullName || t('dashboard.defaultName') })}
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          {t('dashboard.welcomeBack')}
        </p>
      </div>

      <div className="space-y-8">
        <MoodTrackerWidget />
        <PersonalizedRecommendations />
      </div>
    </div>
  );
};

export default DashboardPage;
