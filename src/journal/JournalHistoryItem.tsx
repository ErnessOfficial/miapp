
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { JournalEntry } from '../../types';
import { ChevronDown, Edit, Trash2 } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface JournalHistoryItemProps {
  entry: JournalEntry;
  onEdit: () => void;
}

const emotionMap: { [key: string]: { emoji: string, labelKey: string } } = {
  neutral: { emoji: '😐', labelKey: 'writingMyStory.steps.emotion.neutral' },
  sad: { emoji: '😢', labelKey: 'writingMyStory.steps.emotion.sad' },
  frustrated: { emoji: '😠', labelKey: 'writingMyStory.steps.emotion.frustrated' },
  anxious: { emoji: '😰', labelKey: 'writingMyStory.steps.emotion.anxious' },
  grateful: { emoji: '😍', labelKey: 'writingMyStory.steps.emotion.grateful' },
  calm: { emoji: '😌', labelKey: 'writingMyStory.steps.emotion.calm' },
  confused: { emoji: '🌀', labelKey: 'writingMyStory.steps.emotion.confused' },
  reflection: { emoji: '✍️', labelKey: '' },
};

const JournalHistoryItem: React.FC<JournalHistoryItemProps> = ({ entry, onEdit }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const { deleteJournalEntry } = useUser();
  const emotionInfo = emotionMap[entry.emotion] || emotionMap.reflection;

  const handleDelete = () => {
    if (window.confirm(t('writingMyStory.deleteConfirmMessage'))) {
      deleteJournalEntry(entry.id);
    }
  };

  const formattedDate = new Date(entry.date).toLocaleDateString(t('language'), {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white/70 rounded-lg shadow-sm transition-all duration-300">
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{emotionInfo.emoji}</span>
          <div>
            <p className="font-semibold text-animik-dark">
              {emotionInfo.labelKey ? t(emotionInfo.labelKey) : entry.reflection}
            </p>
            <p className="text-xs text-gray-500">{formattedDate}
             {entry.lastModified && <span className="italic"> {t('writingMyStory.edited')}</span>}
            </p>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </div>

      {isExpanded && (
        <div className="p-4 border-t border-gray-200 animate-in fade-in duration-300">
          <div className="space-y-3 text-sm text-gray-700">
            <p className="whitespace-pre-wrap">{entry.text}</p>
            {entry.influences.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {entry.influences.map(inf => (
                  <span key={inf.id} className="bg-animik-sky/50 text-animik-dark text-xs font-medium px-2.5 py-1 rounded-full">
                    {inf.text}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2 mt-4">
              <button onClick={onEdit} className="p-2 text-gray-500 hover:text-animik-dark hover:bg-gray-100 rounded-full transition-colors" aria-label={t('common.edit')}>
                  <Edit className="w-4 h-4" />
              </button>
              <button onClick={handleDelete} className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors" aria-label={t('common.delete')}>
                  <Trash2 className="w-4 h-4" />
              </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalHistoryItem;
