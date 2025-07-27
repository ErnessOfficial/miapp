
import React from 'react';
import { useTranslation } from 'react-i18next';
import { WellbeingHistoryEntry } from '../types';

interface ProgressFeedbackProps {
  history: WellbeingHistoryEntry[];
}

const ProgressFeedback: React.FC<ProgressFeedbackProps> = ({ history }) => {
  const { t } = useTranslation();

  if (history.length < 2) {
    return null;
  }

  const latestResult = history[0];
  const previousResult = history[1];
  const scoreDifference = latestResult.score - previousResult.score;

  let feedback: { messageKey: string; emoji: string; colorClass: string };

  if (scoreDifference >= 10) {
    feedback = {
      messageKey: 'progressFeedback.improvement',
      emoji: '😊',
      colorClass: 'bg-green-100 border-green-400 text-green-800'
    };
  } else if (scoreDifference <= -10) {
    feedback = {
      messageKey: 'progressFeedback.decline',
      emoji: '💡',
      colorClass: 'bg-red-100 border-red-400 text-red-800'
    };
  } else {
    feedback = {
      messageKey: 'progressFeedback.stability',
      emoji: '🌱',
      colorClass: 'bg-yellow-100 border-yellow-400 text-yellow-800'
    };
  }

  return (
    <div className="mt-8 animate-in fade-in duration-500">
      <h3 className="text-xl font-semibold text-animik-dark mb-3">{t('progressFeedback.title')}</h3>
      <div className={`flex items-start p-4 space-x-4 rounded-lg border-l-4 ${feedback.colorClass}`}>
        <span className="text-2xl mt-1">{feedback.emoji}</span>
        <p className="text-sm">{t(feedback.messageKey)}</p>
      </div>
    </div>
  );
};

export default ProgressFeedback;
