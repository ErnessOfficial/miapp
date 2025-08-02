
import React from 'react';
import { Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const JournalLockScreen: React.FC<{ onUnlock: () => void }> = ({ onUnlock }) => {
  const { t } = useTranslation();

  // This is a placeholder for a future security feature.
  // In a real implementation, this would handle PIN input or biometric auth.

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-animik-sky/10 rounded-lg">
      <Lock className="w-12 h-12 text-animik-lilac mb-4" />
      <h2 className="text-xl font-semibold text-animik-dark">
        {t('writingMyStory.lock.title')}
      </h2>
      <p className="text-gray-600 my-2">
        {t('writingMyStory.lock.description')}
      </p>
      {/* Placeholder for PIN input */}
      <button
        onClick={onUnlock}
        className="mt-4 py-2 px-6 bg-animik-lilac text-white font-semibold rounded-lg shadow-md hover:bg-purple-500 transition-colors"
      >
        {t('writingMyStory.lock.unlockButton')}
      </button>
    </div>
  );
};

export default JournalLockScreen;
