
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserContext';
import JournalEntryFlow from '../journal/JournalEntryFlow';
import { JournalEntry } from '../types';
import { Sparkles, PlusCircle } from 'lucide-react';
import JournalHistoryList from '../journal/JournalHistoryList';
import EditJournalEntryModal from '../journal/EditJournalEntryModal';

const EmotionalJournalPage: React.FC = () => {
    const { t } = useTranslation();
    const { user, isEmpatheticMode, toggleEmpatheticMode } = useUser();
    const [isWriting, setIsWriting] = useState(false);
    const [motivationalQuote, setMotivationalQuote] = useState('');
    const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);

    useEffect(() => {
        const quotes = t('writingMyStory.motivationalQuotes', { returnObjects: true }) as string[];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setMotivationalQuote(randomQuote);
    }, [t]);

    return (
        <div className="w-full max-w-5xl mx-auto animate-in fade-in duration-500">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-animik-dark">
                      {t('writingMyStory.title')}
                    </h1>
                    <p className="flex items-center gap-2 text-gray-500 mt-2 italic">
                        <Sparkles className="w-4 h-4 text-animik-peach" />
                        <span>{motivationalQuote}</span>
                    </p>
                </div>
                <div className="flex items-center space-x-2 bg-white/50 p-1 rounded-full">
                    <span className="text-sm font-semibold text-animik-dark ml-2">{t('writingMyStory.empatheticMode')}</span>
                    <button
                        onClick={toggleEmpatheticMode}
                        role="switch"
                        aria-checked={isEmpatheticMode}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            isEmpatheticMode ? 'bg-animik-lilac' : 'bg-gray-300'
                        }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                isEmpatheticMode ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                    </button>
                </div>
            </div>
            
            <div className={`p-4 sm:p-6 rounded-2xl shadow-lg transition-colors duration-500 space-y-8 ${isEmpatheticMode ? 'bg-animik-warm-beige/80' : 'bg-white/80'} backdrop-blur-sm`}>
                {/* New Entry Button */}
                <div className="text-center">
                    <button
                        onClick={() => setIsWriting(true)}
                        className="inline-flex items-center justify-center gap-3 py-3 px-8 bg-animik-lilac text-white font-semibold rounded-lg shadow-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 transform hover:scale-105"
                    >
                        <PlusCircle className="w-5 h-5" />
                        <span>{t('writingMyStory.writeToday')}</span>
                    </button>
                </div>

                {/* History List */}
                <JournalHistoryList onEditEntry={setEditingEntry} />
            </div>

            {/* Writing Modal */}
            {isWriting && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                     <div 
                        className={`w-full max-w-2xl p-4 sm:p-6 rounded-2xl shadow-lg transition-colors duration-500 ${isEmpatheticMode ? 'bg-animik-warm-beige' : 'bg-white'} backdrop-blur-sm animate-in fade-in-25 zoom-in-95`}
                        onClick={(e) => e.stopPropagation()}
                     >
                        <JournalEntryFlow onSave={() => setIsWriting(false)} onCancel={() => setIsWriting(false)} />
                     </div>
                </div>
            )}

            {/* Editing Modal */}
            {editingEntry && (
                <EditJournalEntryModal
                    entry={editingEntry}
                    onClose={() => setEditingEntry(null)}
                />
            )}
        </div>
    );
};

export default EmotionalJournalPage;
