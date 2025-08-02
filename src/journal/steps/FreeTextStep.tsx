
import React from 'react';
import { useTranslation } from 'react-i18next';

interface FreeTextStepProps {
  text: string;
  onTextChange: (text: string) => void;
}

const FreeTextStep: React.FC<FreeTextStepProps> = ({ text, onTextChange }) => {
  const { t } = useTranslation();

  return (
    <div className="animate-in fade-in duration-500">
      <h3 className="text-xl font-semibold text-animik-dark mb-4 text-center">
        {t('writingMyStory.steps.freewrite.title')}
      </h3>
      <textarea
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder={t('writingMyStory.steps.freewrite.placeholder')}
        className="w-full h-48 p-3 bg-white text-animik-dark border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-animik-lilac focus:border-animik-lilac resize-none"
      />
    </div>
  );
};

export default FreeTextStep;
