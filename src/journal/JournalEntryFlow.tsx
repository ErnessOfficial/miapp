
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { JournalEntry, JournalInfluence } from '../types';
import EmotionSelectorStep from './steps/EmotionSelectorStep';
import InfluenceSelectorStep from './steps/InfluenceSelectorStep';
import FreeTextStep from './steps/FreeTextStep';
import MiniReflectionStep from './steps/MiniReflectionStep';

interface JournalEntryFlowProps {
  onSave: (entry: Omit<JournalEntry, 'id' | 'date'>) => void;
  onCancel: () => void;
}

const JournalEntryFlow: React.FC<JournalEntryFlowProps> = ({ onSave, onCancel }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [emotion, setEmotion] = useState('');
  const [influences, setInfluences] = useState<JournalInfluence[]>([]);
  const [text, setText] = useState('');
  const [reflection, setReflection] = useState('');
  
  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSave();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSave = () => {
    onSave({
      emotion,
      influences,
      text,
      reflection,
    });
  };
  
  const empatheticMessages = {
      2: t('writingMyStory.allFeelingsValid'),
      3: t('writingMyStory.writingIsHealing'),
      4: emotion === 'confused' ? t('writingMyStory.noAnswersNeeded') : t('writingMyStory.oneDayAtATime')
  };

  return (
    <div className="p-2 sm:p-4">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div
          className="bg-animik-lilac h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>
      <p className="text-center text-gray-500 text-sm mb-4">{t('writingMyStory.progress', { current: step, total: totalSteps })}</p>

      {/* Empathetic Message */}
      {empatheticMessages[step as keyof typeof empatheticMessages] && (
          <p className="text-center text-gray-500 italic text-sm mb-4 animate-in fade-in duration-300">
              {empatheticMessages[step as keyof typeof empatheticMessages]}
          </p>
      )}

      {/* Step Content */}
      <div className="min-h-[300px]">
        {step === 1 && <EmotionSelectorStep selectedEmotion={emotion} onSelect={setEmotion} />}
        {step === 2 && <InfluenceSelectorStep selectedInfluences={influences} onSelect={setInfluences} />}
        {step === 3 && <FreeTextStep text={text} onTextChange={setText} />}
        {step === 4 && <MiniReflectionStep selectedReflection={reflection} onSelect={setReflection} />}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={step === 1 ? onCancel : handleBack}
          className="py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
        >
          {step === 1 ? t('common.close') : t('writingMyStory.back')}
        </button>
        <button
          onClick={handleNext}
          disabled={step === 1 && !emotion}
          className="py-2 px-6 bg-animik-dark text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {step === totalSteps ? t('writingMyStory.finish') : t('writingMyStory.next')}
        </button>
      </div>
    </div>
  );
};

export default JournalEntryFlow;
