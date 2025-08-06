
import React, { useState } from 'react';
import { MoodEntry } from '../../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';

const MoodTrackerWidget: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const { t } = useTranslation();

  const moodOptions = [
    { emoji: '😄', label: t('moodTracker.moods.happy'), value: 5 },
    { emoji: '🙂', label: t('moodTracker.moods.okay'), value: 4 },
    { emoji: '😐', label: t('moodTracker.moods.neutral'), value: 3 },
    { emoji: '😕', label: t('moodTracker.moods.sad'), value: 2 },
    { emoji: '😢', label: t('moodTracker.moods.awful'), value: 1 },
  ];
  
  const moodHistoryData: MoodEntry[] = [
    { day: t('moodTracker.days.mon'), mood: 4 },
    { day: t('moodTracker.days.tue'), mood: 3 },
    { day: t('moodTracker.days.wed'), mood: 5 },
    { day: t('moodTracker.days.thu'), mood: 3 },
    { day: t('moodTracker.days.fri'), mood: 4 },
    { day: t('moodTracker.days.sat'), mood: 5 },
    { day: t('moodTracker.days.sun'), mood: 2 },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-animik-dark mb-4">{t('moodTracker.title')}</h2>
      
      <div className="flex justify-around items-center mb-8 p-4 bg-animik-gray rounded-lg">
        {moodOptions.map(mood => (
          <button
            key={mood.value}
            onClick={() => setSelectedMood(mood.value)}
            className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${selectedMood === mood.value ? 'bg-animik-lilac scale-110 shadow-md' : 'hover:bg-gray-200'}`}
          >
            <span className="text-4xl">{mood.emoji}</span>
            <span className={`text-xs mt-1 font-medium ${selectedMood === mood.value ? 'text-white' : 'text-gray-600'}`}>{mood.label}</span>
          </button>
        ))}
      </div>
      
      <h3 className="text-xl font-semibold text-animik-dark mb-4">{t('moodTracker.weekTitle')}</h3>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <AreaChart
            data={moodHistoryData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C5B4E3" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#C5B4E3" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="day" stroke="#888" />
            <YAxis hide={true} domain={[0, 6]} />
            <Tooltip
              contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #ccc', borderRadius: '10px' }}
              labelStyle={{ fontWeight: 'bold' }}
              formatter={(value: number) => [moodOptions.find(m => m.value === value)?.label, null]}
            />
            <Area type="monotone" dataKey="mood" stroke="#A180D7" fillOpacity={1} fill="url(#colorMood)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MoodTrackerWidget;
