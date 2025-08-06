
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';
import { WellbeingHistoryEntry } from '../../types';
import ProgressChart from './ProgressChart';
import ProgressFeedback from './ProgressFeedback';
import { useUser } from '../../context/UserContext';
import MotivationalPrompt from './MotivationalPrompt';

const PersonalizedRecommendations: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { wellbeingHistory: history } = useUser();

  const handleTakeTest = () => {
    navigate('/diagnostic-test');
  };
  
  const latestResult = history.length > 0 ? history[0] : null;

  let attentionInfo: { titleKey: string; descriptionKey: string; colorClass: string; } | null = null;
  if (latestResult) {
      if (latestResult.score >= 70) {
          attentionInfo = {
              titleKey: 'recommendations.attentionLevels.low_title',
              descriptionKey: 'recommendations.attentionLevels.low_description',
              colorClass: 'text-green-600',
          };
      } else if (latestResult.score >= 40) {
          attentionInfo = {
              titleKey: 'recommendations.attentionLevels.moderate_title',
              descriptionKey: 'recommendations.attentionLevels.moderate_description',
              colorClass: 'text-amber-600',
          };
      } else {
          attentionInfo = {
              titleKey: 'recommendations.attentionLevels.high_title',
              descriptionKey: 'recommendations.attentionLevels.high_description',
              colorClass: 'text-red-600',
          };
      }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-animik-dark mb-4">
        {t('recommendations.title')}
      </h2>
      
      {!latestResult ? (
        <div className="bg-animik-peach/30 p-6 rounded-xl text-center">
            <FileText className="w-12 h-12 mx-auto text-animik-dark/70 mb-4" />
            <p className="text-animik-dark text-base mb-6">
                {t('recommendations.welcomeMessage')}
            </p>
            <button
                onClick={handleTakeTest}
                className="w-full max-w-xs mx-auto py-3 px-6 bg-animik-lilac text-white font-semibold rounded-lg shadow-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 transform hover:scale-105"
            >
                {t('recommendations.takeTestButton')}
            </button>
        </div>
      ) : (
        <div>
            <div className="flex flex-col md:flex-row gap-6 bg-animik-sky/20 p-6 rounded-xl">
                {/* Left Section */}
                <div className="flex flex-col items-center justify-center text-center md:w-1/3 border-b-2 md:border-b-0 md:border-r-2 border-animik-sky/40 pb-6 md:pb-0 md:pr-6">
                    <p className="text-base text-gray-700">{t('recommendations.yourScore')}</p>
                    <p className="text-6xl font-bold text-animik-dark my-1">{latestResult.score.toFixed(0)}%</p>
                    <p className="text-xs text-gray-500 mb-4">{t('recommendations.lastTestLabel')} {latestResult.date}</p>
                    <button
                        onClick={handleTakeTest}
                        className="py-2 px-4 bg-white border border-animik-lilac text-animik-lilac font-semibold rounded-lg shadow-sm hover:bg-animik-lilac/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300"
                    >
                        {t('recommendations.retakeTestButton')}
                    </button>
                </div>
                
                {/* Right Section */}
                {attentionInfo && (
                    <div className="md:w-2/3 flex flex-col justify-center">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{t('recommendations.attentionLevels.title')}</h3>
                        <div className="bg-white/50 p-4 rounded-lg h-full flex flex-col">
                            <h4 className={`text-xl font-bold mb-2 ${attentionInfo.colorClass}`}>{t(attentionInfo.titleKey)}</h4>
                            <p className="text-sm text-gray-700 flex-grow">{t(attentionInfo.descriptionKey)}</p>
                            <div className="mt-4 text-right">
                                <button
                                    onClick={() => navigate('/my-actions')}
                                    className="inline-flex items-center gap-2 py-2 px-4 bg-animik-dark text-white font-semibold rounded-lg shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-animik-dark transition-all duration-300"
                                >
                                    {t('recommendations.goToMyConsciousMovements')}
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <MotivationalPrompt lastTestDate={latestResult.date} />
            
            {history.length > 1 && (
                <div className="mt-8 text-left">
                    <ProgressChart history={history} />
                    <ProgressFeedback history={history} />
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default PersonalizedRecommendations;
