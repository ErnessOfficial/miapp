
import React from 'react';
import { useTranslation } from 'react-i18next';

interface MiniReflectionStepProps {
  selectedReflection: string;
  onSelect: (reflection: string) => void;
}

const MiniReflectionStep: React.FC<MiniReflectionStepProps> = ({ selectedReflection, onSelect }) => {
  const { t } = useTranslation();

  const reflections = [
    t('writingMyStory.steps.reflection.breathe'),
    t('writingMyStory.steps.reflection.talk'),
    t('writingMyStory.steps.reflection.enjoy'),
    t('writingMyStory.steps.reflection.pause'),
    t('writingMyStory.steps.reflection.writeLater'),
    t('writingMyStory.steps.reflection.notSure'),
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <h3 className="text-xl font-semibold text-animik-dark mb-6 text-center">
        {t('writingMyStory.steps.reflection.title')}
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {reflections.map((reflection) => (
          <button
            key={reflection}
            onClick={() => onSelect(reflection)}
            className={`px-4 py-2 rounded-full border-2 transition-all duration-200 ${
              selectedReflection === reflection
                ? 'bg-animik-peach/50 border-animik-peach font-semibold text-animik-dark'
                : 'bg-white border-gray-200 text-gray-700 hover:border-animik-peach/50'
            }`}
          >
            {reflection}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MiniReflectionStep;
