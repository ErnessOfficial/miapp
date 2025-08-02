
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../context/UserContext';
import { JournalEntry } from '../../types';
import { X } from 'lucide-react';

interface EditJournalEntryModalProps {
  entry: JournalEntry;
  onClose: () => void;
}

const EditJournalEntryModal: React.FC<EditJournalEntryModalProps> = ({ entry, onClose }) => {
  const { t } = useTranslation();
  const { updateJournalEntry } = useUser();
  const [text, setText] = useState(entry.text);
  
  useEffect(() => {
      setText(entry.text);
  }, [entry]);

  const handleSave = () => {
    if (text.trim() === entry.text.trim()) {
        onClose();
        return;
    }
    updateJournalEntry({ ...entry, text });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 space-y-4 transform transition-all duration-300 scale-95 opacity-0 animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-animik-dark">{t('common.edit')}</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
                <X className="w-5 h-5 text-gray-600" />
            </button>
        </div>

        <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            className="w-full p-3 bg-gray-50 text-animik-dark border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-animik-lilac resize-y"
        />

        <div className="flex justify-end gap-3 pt-2">
          <button onClick={onClose} className="py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
            {t('common.cancel')}
          </button>
          <button
            onClick={handleSave}
            className="py-2 px-6 bg-animik-lilac text-white font-semibold rounded-lg shadow-md hover:bg-purple-500 transition-colors"
          >
            {t('common.save')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditJournalEntryModal;
