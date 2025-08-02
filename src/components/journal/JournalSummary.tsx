
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { JournalEntry } from '../../types';
import { useUser } from '../../context/UserContext';
import { Palette, Image as ImageIcon, Music, CheckCircle } from 'lucide-react';

interface JournalSummaryProps {
  entry: JournalEntry;
  onContinue: () => void;
}

const JournalSummary: React.FC<JournalSummaryProps> = ({ entry, onContinue }) => {
  const { t } = useTranslation();
  const { updateJournalEntry } = useUser();
  const [color, setColor] = useState(entry.color || '');
  const [imageUrl, setImageUrl] = useState(entry.imageUrl || '');
  const [song, setSong] = useState(entry.song || '');
  const [isSaved, setIsSaved] = useState(false);
  
  const emotionMap: { [key: string]: string } = {
      neutral: t('writingMyStory.steps.emotion.neutral'),
      sad: t('writingMyStory.steps.emotion.sad'),
      frustrated: t('writingMyStory.steps.emotion.frustrated'),
      anxious: t('writingMyStory.steps.emotion.anxious'),
      grateful: t('writingMyStory.steps.emotion.grateful'),
      calm: t('writingMyStory.steps.emotion.calm'),
      confused: t('writingMyStory.steps.emotion.confused'),
  };

  const handleSave = () => {
    const updatedEntry = { ...entry, color, imageUrl, song };
    updateJournalEntry(updatedEntry);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };
  
  return (
    <div className="p-4 animate-in fade-in duration-500">
      <div className="text-center mb-6">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3"/>
          <h2 className="text-2xl font-bold text-animik-dark">{t('writingMyStory.summary.title')}</h2>
          <p className="text-gray-600 mt-2">{t('writingMyStory.summary.registered')}</p>
      </div>

      <div className="space-y-4 bg-white/50 p-4 rounded-lg">
        <div>
          <h3 className="font-semibold text-animik-dark">{t('writingMyStory.summary.chosenEmotion')}</h3>
          <p className="text-gray-700 capitalize">{emotionMap[entry.emotion]}</p>
        </div>
        <div>
          <h3 className="font-semibold text-animik-dark">{t('writingMyStory.summary.keyFactors')}</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {entry.influences.map(inf => (
              <span key={inf.id} className="bg-animik-sky/50 text-animik-dark text-xs font-medium px-2.5 py-1 rounded-full">
                {inf.text}
              </span>
            ))}
          </div>
        </div>
        {entry.text && (
          <div>
            <h3 className="font-semibold text-animik-dark">{t('writingMyStory.summary.yourText')}</h3>
            <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-2 rounded-md">{entry.text}</p>
          </div>
        )}
        {entry.reflection && (
           <div>
            <h3 className="font-semibold text-animik-dark">{t('writingMyStory.summary.yourAction')}</h3>
            <p className="text-gray-700">{entry.reflection}</p>
          </div>
        )}
      </div>

      <div className="mt-6 space-y-4">
        <h3 className="font-semibold text-center text-animik-dark">Enriquece tu recuerdo (Opcional)</h3>
        <div className="relative">
          <Palette className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder={t('writingMyStory.summary.addColor')} value={color} onChange={e => setColor(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-animik-lilac focus:border-animik-lilac" />
        </div>
        <div className="relative">
          <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder={t('writingMyStory.summary.addImage')} value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-animik-lilac focus:border-animik-lilac" />
        </div>
        <div className="relative">
          <Music className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder={t('writingMyStory.summary.addSong')} value={song} onChange={e => setSong(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-animik-lilac focus:border-animik-lilac" />
        </div>
         <button
            onClick={handleSave}
            className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors disabled:bg-green-300"
          >
            {isSaved ? t('writingMyStory.summary.saved') : t('writingMyStory.summary.save')}
        </button>
      </div>
      
      <div className="mt-8 text-center">
        <button
          onClick={onContinue}
          className="py-3 px-8 bg-animik-dark text-white font-bold rounded-lg shadow-lg hover:bg-gray-800 transition-all transform hover:scale-105"
        >
          {t('writingMyStory.summary.viewHistory')}
        </button>
      </div>
    </div>
  );
};

export default JournalSummary;
