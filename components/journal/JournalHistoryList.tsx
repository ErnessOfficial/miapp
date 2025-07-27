
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../context/UserContext';
import JournalHistoryItem from './JournalHistoryItem';
import { JournalEntry } from '../../types';

interface JournalHistoryListProps {
  onEditEntry: (entry: JournalEntry) => void;
}

const JournalHistoryList: React.FC<JournalHistoryListProps> = ({ onEditEntry }) => {
  const { t } = useTranslation();
  const { journalEntries } = useUser();
  
  // Sort entries by date, newest first
  const sortedEntries = [...journalEntries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div>
      <h2 className="text-2xl font-bold text-animik-dark text-center mb-6 border-t pt-8 border-gray-200/50">
        {t('writingMyStory.historyTitle')}
      </h2>
      {sortedEntries.length > 0 ? (
        <div className="space-y-4">
          {sortedEntries.map(entry => (
            <JournalHistoryItem key={entry.id} entry={entry} onEdit={() => onEditEntry(entry)} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">
          {t('writingMyStory.emptyHistory')}
        </p>
      )}
    </div>
  );
};

export default JournalHistoryList;
