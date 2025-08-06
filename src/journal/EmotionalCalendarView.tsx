
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import JournalDetailModal from './JournalDetailModal';
import { JournalEntry } from '../types';

const emotionColors: { [key: string]: string } = {
  neutral: 'bg-gray-300',
  sad: 'bg-blue-300',
  frustrated: 'bg-red-400',
  anxious: 'bg-purple-300',
  grateful: 'bg-yellow-300',
  calm: 'bg-green-300',
  confused: 'bg-indigo-300',
};

const emotionTextColors: { [key: string]: string } = {
  neutral: 'text-gray-700',
  sad: 'text-blue-700',
  frustrated: 'text-red-800',
  anxious: 'text-purple-700',
  grateful: 'text-yellow-800',
  calm: 'text-green-700',
  confused: 'text-indigo-700',
};

const emotionLegend: { [key: string]: string } = {
  neutral: "writingMyStory.steps.emotion.neutral",
  sad: "writingMyStory.steps.emotion.sad",
  frustrated: "writingMyStory.steps.emotion.frustrated",
  anxious: "writingMyStory.steps.emotion.anxious",
  grateful: "writingMyStory.steps.emotion.grateful",
  calm: "writingMyStory.steps.emotion.calm",
  confused: "writingMyStory.steps.emotion.confused",
};

const EmotionalCalendarView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useTranslation();
  const { journalEntries } = useUser();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  const entriesByDate = useMemo(() => {
    return journalEntries.reduce((acc, entry) => {
      acc[entry.date] = entry;
      return acc;
    }, {} as { [key: string]: JournalEntry });
  }, [journalEntries]);

  const changeMonth = (amount: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + amount);
      return newDate;
    });
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleDateString(t('language'), { month: 'long', year: 'numeric' });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const blanks = Array(firstDay === 0 ? 6 : firstDay - 1).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const currentMonthEntries = useMemo(() => {
    return journalEntries.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate.getFullYear() === year && entryDate.getMonth() === month;
    });
  }, [journalEntries, year, month]);

  const frequentEmotion = useMemo(() => {
    if (currentMonthEntries.length === 0) return null;
    const emotionCounts = currentMonthEntries.reduce((acc, entry) => {
        acc[entry.emotion] = (acc[entry.emotion] || 0) + 1;
        return acc;
    }, {} as {[key:string]: number});

    return Object.keys(emotionCounts).reduce((a, b) => emotionCounts[a] > emotionCounts[b] ? a : b);
  }, [currentMonthEntries]);


  return (
    <div className="p-4 animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold text-center text-animik-dark mb-4">{t('writingMyStory.calendar.title')}</h2>
      
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-200"><ChevronLeft /></button>
        <h3 className="text-lg font-semibold text-animik-dark capitalize">{monthName}</h3>
        <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-200"><ChevronRight /></button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500 mb-2">
        <div>{t('writingMyStory.calendar.days.mon')}</div>
        <div>{t('writingMyStory.calendar.days.tue')}</div>
        <div>{t('writingMyStory.calendar.days.wed')}</div>
        <div>{t('writingMyStory.calendar.days.thu')}</div>
        <div>{t('writingMyStory.calendar.days.fri')}</div>
        <div>{t('writingMyStory.calendar.days.sat')}</div>
        <div>{t('writingMyStory.calendar.days.sun')}</div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {blanks.map((_, i) => <div key={`blank-${i}`} />)}
        {days.map(day => {
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const entry = entriesByDate[dateStr];
          const bgColor = entry ? emotionColors[entry.emotion] : 'bg-gray-100';
          
          return (
            <div
              key={day}
              onClick={() => entry && setSelectedEntry(entry)}
              className={`h-12 w-full rounded-lg flex items-center justify-center transition-transform duration-200 ${entry ? 'cursor-pointer hover:scale-110' : ''} ${bgColor}`}
            >
              <span className={entry ? 'text-white font-bold' : 'text-gray-400'}>{day}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-white/60 rounded-lg">
          <h3 className="text-lg font-semibold text-animik-dark mb-3">{t('writingMyStory.calendar.monthlyInsights')}</h3>
          {currentMonthEntries.length > 0 ? (
              <div className="space-y-2 text-sm text-gray-700">
                  <p>{t('writingMyStory.calendar.entryCount', {count: currentMonthEntries.length})}</p>
                  {frequentEmotion && (
                      <p>{t('writingMyStory.calendar.frequentEmotion')}: <span className={`font-semibold capitalize ${emotionTextColors[frequentEmotion]}`}>{t(emotionLegend[frequentEmotion] as any)}</span></p>
                  )}
              </div>
          ) : (
              <p className="text-sm text-gray-500">{t('writingMyStory.calendar.noEntries')}</p>
          )}
      </div>

      <div className="mt-6 p-4 bg-white/60 rounded-lg">
          <h3 className="text-lg font-semibold text-animik-dark mb-3">{t('writingMyStory.calendar.legend')}</h3>
          <div className="flex flex-wrap gap-2">
              {Object.entries(emotionLegend).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-1.5">
                      <div className={`w-3 h-3 rounded-full ${emotionColors[key]}`}></div>
                      <span className="text-xs text-gray-600">{t(value)}</span>
                  </div>
              ))}
          </div>
      </div>


      {selectedEntry && (
        <JournalDetailModal entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
      )}

      <div className="mt-8 text-center">
        <button onClick={onBack} className="py-2 px-6 bg-animik-lilac text-white font-semibold rounded-lg shadow-md hover:bg-purple-500 transition-colors">
            {t('writingMyStory.calendar.backToHome')}
        </button>
      </div>
    </div>
  );
};

export default EmotionalCalendarView;
