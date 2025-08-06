
import React from 'react';
import { useTranslation } from 'react-i18next';
import { JournalEntry } from '../types';
import { X } from 'lucide-react';

interface JournalDetailModalProps {
  entry: JournalEntry;
  onClose: () => void;
}

const JournalDetailModal: React.FC<JournalDetailModalProps> = ({ entry, onClose }) => {
  const { t } = useTranslation();
  
  const emotionMap: { [key: string]: string } = {
      neutral: t('writingMyStory.steps.emotion.neutral'),
      sad: t('writingMyStory.steps.emotion.sad'),
      frustrated: t('writingMyStory.steps.emotion.frustrated'),
      anxious: t('writingMyStory.steps.emotion.anxious'),
      grateful: t('writingMyStory.steps.emotion.grateful'),
      calm: t('writingMyStory.steps.emotion.calm'),
      confused: t('writingMyStory.steps.emotion.confused'),
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 space-y-4 transform transition-all duration-300 scale-95 opacity-0 animate-in fade-in zoom-in-95 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b pb-3">
            <div>
                <h2 className="text-xl font-bold text-animik-dark">{t('writingMyStory.calendar.entryDetails')}</h2>
                <p className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString(t('language'), { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <div className="overflow-y-auto space-y-4 p-1">
            <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="font-semibold text-animik-dark text-sm mb-1">{t('writingMyStory.summary.chosenEmotion')}</h3>
                <p className="text-gray-700 capitalize">{emotionMap[entry.emotion]}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="font-semibold text-animik-dark text-sm mb-1">{t('writingMyStory.summary.keyFactors')}</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                {entry.influences.map(inf => (
                    <span key={inf.id} className="bg-animik-sky/50 text-animik-dark text-xs font-medium px-2.5 py-1 rounded-full">
                    {inf.text}
                    </span>
                ))}
                </div>
            </div>
            {entry.text && (
                <div className="bg-gray-50 p-3 rounded-lg">
                    <h3 className="font-semibold text-animik-dark text-sm mb-1">{t('writingMyStory.summary.yourText')}</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{entry.text}</p>
                </div>
            )}
             {entry.reflection && (
                <div className="bg-gray-50 p-3 rounded-lg">
                    <h3 className="font-semibold text-animik-dark text-sm mb-1">{t('writingMyStory.summary.yourAction')}</h3>
                    <p className="text-gray-700">{entry.reflection}</p>
                </div>
            )}
            {entry.color && <p><strong>Color:</strong> {entry.color}</p>}
            {entry.song && <p><strong>Canción:</strong> {entry.song}</p>}
            {entry.imageUrl && (
                <div className="bg-gray-50 p-3 rounded-lg">
                    <h3 className="font-semibold text-animik-dark text-sm mb-2">Imagen del día</h3>
                    <img src={entry.imageUrl} alt="Recuerdo del día" className="rounded-lg max-h-48 w-auto mx-auto" />
                </div>
            )}
        </div>

        <div className="pt-4 border-t">
          <button onClick={onClose} className="w-full py-2 px-4 bg-animik-lilac hover:bg-purple-500 text-white font-semibold rounded-lg transition-colors">
            {t('common.close')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalDetailModal;
