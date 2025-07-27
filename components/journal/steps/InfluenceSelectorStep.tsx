
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { JournalInfluence } from '../../../types';

interface InfluenceSelectorStepProps {
  selectedInfluences: JournalInfluence[];
  onSelect: (influences: JournalInfluence[]) => void;
}

const InfluenceSelectorStep: React.FC<InfluenceSelectorStepProps> = ({ selectedInfluences, onSelect }) => {
  const { t } = useTranslation();
  const [otherText, setOtherText] = useState('');

  const influences = [
    { id: 'conversation', text: t('writingMyStory.steps.influence.conversation') },
    { id: 'work', text: t('writingMyStory.steps.influence.work') },
    { id: 'memory', text: t('writingMyStory.steps.influence.memory') },
    { id: 'news', text: t('writingMyStory.steps.influence.news') },
    { id: 'loneliness', text: t('writingMyStory.steps.influence.loneliness') },
    { id: 'routine', text: t('writingMyStory.steps.influence.routine') },
    { id: 'meTime', text: t('writingMyStory.steps.influence.meTime') },
  ];

  const handleSelect = (id: string, text: string) => {
    const isSelected = selectedInfluences.some(inf => inf.id === id);
    if (isSelected) {
      onSelect(selectedInfluences.filter(inf => inf.id !== id));
    } else {
      onSelect([...selectedInfluences, { id, text, isCustom: false }]);
    }
  };

  const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setOtherText(newText);
    const otherIndex = selectedInfluences.findIndex(inf => inf.id === 'other');
    if (otherIndex > -1) {
      const updatedInfluences = [...selectedInfluences];
      if (newText.trim()) {
        updatedInfluences[otherIndex] = { id: 'other', text: newText, isCustom: true };
      } else {
        updatedInfluences.splice(otherIndex, 1);
      }
      onSelect(updatedInfluences);
    }
  };
  
  const handleOtherCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
     if (e.target.checked) {
         if(otherText.trim()){
            onSelect([...selectedInfluences, { id: 'other', text: otherText, isCustom: true }]);
         } else {
             onSelect([...selectedInfluences, { id: 'other', text: '', isCustom: true }]);
         }
     } else {
         onSelect(selectedInfluences.filter(inf => inf.id !== 'other'));
     }
  }

  const isOtherSelected = selectedInfluences.some(inf => inf.id === 'other');

  return (
    <div className="animate-in fade-in duration-500">
      <h3 className="text-xl font-semibold text-animik-dark mb-6 text-center">
        {t('writingMyStory.steps.influence.title')}
      </h3>
      <div className="space-y-3">
        {influences.map(({ id, text }) => (
          <label key={id} className="flex items-center p-3 bg-white rounded-lg border-2 cursor-pointer transition-colors hover:bg-animik-sky/10">
            <input
              type="checkbox"
              checked={selectedInfluences.some(inf => inf.id === id)}
              onChange={() => handleSelect(id, text)}
              className="h-5 w-5 rounded border-gray-300 text-animik-lilac focus:ring-animik-lilac"
            />
            <span className="ml-3 text-gray-700">{text}</span>
          </label>
        ))}
        {/* Other option */}
        <div>
            <label className="flex items-center p-3 bg-white rounded-lg border-2 cursor-pointer transition-colors hover:bg-animik-sky/10">
              <input
                type="checkbox"
                checked={isOtherSelected}
                onChange={handleOtherCheckbox}
                className="h-5 w-5 rounded border-gray-300 text-animik-lilac focus:ring-animik-lilac"
              />
              <span className="ml-3 text-gray-700">{t('writingMyStory.steps.influence.other')}</span>
            </label>
            {isOtherSelected && (
                <input
                    type="text"
                    value={otherText}
                    onChange={handleOtherChange}
                    placeholder={t('writingMyStory.steps.influence.otherPlaceholder')}
                    className="mt-2 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-animik-lilac focus:border-animik-lilac sm:text-sm"
                />
            )}
        </div>
      </div>
    </div>
  );
};

export default InfluenceSelectorStep;
