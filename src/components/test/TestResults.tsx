
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PartyPopper } from 'lucide-react';

interface TestResultsProps {
  score: number;
}

const TestResults: React.FC<TestResultsProps> = ({ score }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-gradient-to-br from-animik-sky/20 to-animik-peach/20 p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-2xl text-center transform transition-all duration-500 animate-in fade-in zoom-in-95">
        <PartyPopper className="w-16 h-16 mx-auto text-animik-yellow mb-4" />
        <h1 className="text-3xl font-bold text-animik-dark">
          {t('diagnosticTest.resultsTitle')}
        </h1>
        <p className="text-gray-500 mt-2 mb-6">
          {t('diagnosticTest.resultsSubtitle')}
        </p>
        <div className="bg-animik-gray p-6 rounded-xl">
            <p className="text-base text-gray-700">{t('diagnosticTest.yourResult')}</p>
            <p className="text-6xl font-bold text-animik-dark my-2">{score.toFixed(0)}%</p>
        </div>
        <button
          onClick={() => navigate('/dashboard', { replace: true })}
          className="mt-8 w-full py-3 px-6 bg-animik-lilac text-white font-semibold rounded-lg shadow-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300"
        >
          {t('diagnosticTest.backToDashboardButton')}
        </button>
      </div>
    </div>
  );
};

export default TestResults;
