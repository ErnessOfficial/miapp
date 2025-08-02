
import React from 'react';
import { useTranslation } from 'react-i18next';

interface EmotionSelectorStepProps {
  selectedEmotion: string;
  onSelect: (emotion: string) => void;
}

const EmotionSelectorStep: React.FC<EmotionSelectorStepProps> = ({ selectedEmotion, onSelect }) => {
  const { t } = useTranslation();
  
  const emotions = [
    { key: 'neutral', emoji: '😐', label: t('writingMyStory.steps.emotion.neutral') },
    { key: 'sad', emoji: '😢', label: t('writingMyStory.steps.emotion.sad') },
    { key: 'frustrated', emoji: '😠', label: t('writingMyStory.steps.emotion.frustrated') },
    { key: 'anxious', emoji: '😰', label: t('writingMyStory.steps.emotion.anxious') },
    { key: 'grateful', emoji: '😍', label: t('writingMyStory.steps.emotion.grateful') },
    { key: 'calm', emoji: '😌', label: t('writingMyStory.steps.emotion.calm') },
    { key: 'confused', emoji: '🌀', label: t('writingMyStory.steps.emotion.confused') },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <h3 className="text-xl font-semibold text-animik-dark mb-6 text-center">
        {t('writingMyStory.steps.emotion.title')}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
        {emotions.map(({ key, emoji, label }) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`flex flex-col items-center justify-center w-28 h-28 p-4 rounded-full border-2 transition-all duration-200 transform hover:scale-105 ${
              selectedEmotion === key
                ? 'bg-animik-lilac/30 border-animik-lilac shadow-lg scale-105'
                : 'bg-white border-gray-200 hover:border-animik-lilac/50'
            }`}
          >
            <span className="text-4xl mb-1">{emoji}</span>
            <span className="text-sm font-medium text-animik-dark text-center">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmotionSelectorStep;
