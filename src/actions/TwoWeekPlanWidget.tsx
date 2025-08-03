
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserContext';
import { JournalEntry } from '../types';
import { Heart, Lock, Check, Sparkles, Flag, PlayCircle, BookOpen, MessageCircle, Smile, Wind, Pencil, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PlanItem {
  day: number;
  action: string;
  explanation: string;
}

interface InteractivePlanWidgetProps {
    planData: PlanItem[];
    category: 'alto' | 'moderado' | 'leve';
}

const iconMap: { [key: string]: React.ElementType } = {
  default: Heart,
  respiración: Wind,
  reflexión: Pencil,
  escribir: Pencil,
  lectura: BookOpen,
  conectar: MessageCircle,
  sentir: Smile,
  observación: Smile,
};

const getIconForAction = (action: string) => {
    const lowerAction = action.toLowerCase();
    for (const key in iconMap) {
        if (lowerAction.includes(key)) {
            return iconMap[key];
        }
    }
    return iconMap.default;
};

const ActivityModal: React.FC<{
  item: PlanItem;
  onClose: () => void;
  onComplete: (reflection: string) => void;
}> = ({ item, onClose, onComplete }) => {
  const { t } = useTranslation();
  const [reflection, setReflection] = useState('');

  const handleComplete = () => {
    onComplete(reflection);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in-25">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 m-4" onClick={e => e.stopPropagation()}>
        <h3 className="text-xl font-bold text-animik-dark mb-4">{t('myConsciousMovements.plan.modal.title', { day: item.day })}: {item.action}</h3>
        <p className="text-gray-600 mb-4">{item.explanation}</p>
        <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 block">{t('myConsciousMovements.plan.modal.reflectionLabel')}</label>
            <textarea
                value={reflection}
                onChange={e => setReflection(e.target.value)}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-animik-lilac focus:border-animik-lilac"
            />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">{t('common.cancel')}</button>
          <button onClick={handleComplete} disabled={!reflection.trim()} className="px-4 py-2 bg-animik-lilac text-white rounded-lg hover:bg-purple-500 transition-colors disabled:bg-gray-400">{t('myConsciousMovements.plan.modal.readyButton')}</button>
        </div>
      </div>
    </div>
  );
};

const CompletionModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { t } = useTranslation();
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in-25">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 text-center" onClick={e => e.stopPropagation()}>
                <Award className="w-16 h-16 mx-auto text-yellow-500 mb-4"/>
                <h3 className="text-2xl font-bold text-animik-dark mb-2">{t('myConsciousMovements.plan.completionModalTitle')}</h3>
                <p className="text-gray-600 mb-6">{t('myConsciousMovements.plan.completionModalMessage')}</p>
                <button onClick={onClose} className="w-full px-4 py-2 bg-animik-lilac text-white rounded-lg hover:bg-purple-500 transition-colors">{t('common.close')}</button>
            </div>
        </div>
    );
};


const TwoWeekPlanWidget: React.FC<InteractivePlanWidgetProps> = ({ planData, category }) => {
    const { t } = useTranslation();
    const { planProgress, updatePlanProgress, addJournalEntry, addCycleReflection, cycleNumber } = useUser();
    const navigate = useNavigate();
    const [activeModalItem, setActiveModalItem] = useState<PlanItem | null>(null);
    const [showCompletionModal, setShowCompletionModal] = useState(false);

    const highestCompletedDay = planProgress?.highestCompletedDay || 0;
    
    const handleDayClick = (item: PlanItem) => {
        const isUnlocked = item.day === highestCompletedDay + 1;
        if(isUnlocked) {
            setActiveModalItem(item);
        }
    };

    const handleCompleteDay = (reflection: string) => {
        if(!activeModalItem) return;

        const newJournalEntry: Omit<JournalEntry, 'id' | 'date'| 'lastModified'> = {
            emotion: 'reflection', 
            influences: [{ id: 'plan', text: `Plan AnImiK14`, isCustom: false }],
            text: `**${activeModalItem.action}**\n\n${reflection}`,
            reflection: t('myConsciousMovements.plan.journalEntryTitle', { day: activeModalItem.day, cycle: cycleNumber }),
        };

        const fullEntry: JournalEntry = {
            ...newJournalEntry,
            id: `plan-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
        };

        addJournalEntry(fullEntry);
        addCycleReflection(activeModalItem.day, reflection);
        updatePlanProgress(activeModalItem.day);

        if(activeModalItem.day === 14) {
            setShowCompletionModal(true);
        }
    };
    
    const handleStartEvaluation = () => {
        navigate('/post-plan-test');
    };

    return (
        <div className="mt-8">
            <div className="relative pl-8">
                {/* Vertical Line */}
                <div className="absolute top-10 bottom-10 left-12 w-0.5 bg-gray-200"></div>

                <div className="space-y-2">
                    {/* Start Node */}
                    <div className="flex items-center gap-4">
                        <div className="z-10 bg-white p-1 rounded-full">
                            <div className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full shadow">
                                <PlayCircle size={20} />
                            </div>
                        </div>
                        <div className="font-bold text-lg text-green-600">{t('myConsciousMovements.plan.start')}</div>
                    </div>

                    {/* Day Nodes */}
                    {planData.map((item) => {
                        const isCompleted = item.day <= highestCompletedDay;
                        const isUnlocked = item.day === highestCompletedDay + 1;
                        const isLocked = item.day > highestCompletedDay + 1;
                        const Icon = getIconForAction(item.action);

                        let statusColor = 'bg-gray-400';
                        if(isCompleted) statusColor = 'bg-green-500';
                        if(isUnlocked) statusColor = 'bg-animik-lilac animate-pulse';

                        return(
                            <div key={item.day} className="flex items-center gap-4">
                               <div className="z-10 bg-white p-1 rounded-full">
                                    <div className={`w-8 h-8 flex items-center justify-center text-white rounded-full shadow ${statusColor}`}>
                                        {isLocked && <Lock size={16} />}
                                        {isCompleted && <Check size={16} />}
                                        {isUnlocked && <Sparkles size={16} />}
                                    </div>
                                </div>
                                <div onClick={() => handleDayClick(item)} className={`p-3 rounded-lg flex-1 border-2 ${isUnlocked ? 'border-animik-lilac bg-white cursor-pointer hover:bg-animik-lilac/10' : 'border-transparent'} ${isLocked ? 'bg-gray-100' : ''} ${isCompleted ? 'bg-green-50' : ''}`}>
                                    <div className="flex items-center gap-3">
                                        <Icon className={`w-6 h-6 ${isCompleted ? 'text-green-500' : isUnlocked ? 'text-animik-lilac' : 'text-gray-400'}`} />
                                        <div>
                                            <p className={`font-semibold ${isCompleted ? 'text-gray-500 line-through' : 'text-animik-dark'}`}>{t('myConsciousMovements.plan.day', {day: item.day})}: {item.action}</p>
                                            <p className="text-xs text-gray-500">{isCompleted ? t('myConsciousMovements.plan.completed') : isUnlocked ? t('myConsciousMovements.plan.youAreHere') : t('myConsciousMovements.plan.locked')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                     {/* Goal Node */}
                    <div className="flex items-center gap-4">
                        <div className="z-10 bg-white p-1 rounded-full">
                            <div className="w-8 h-8 flex items-center justify-center bg-yellow-500 text-white rounded-full shadow">
                                <Flag size={20} />
                            </div>
                        </div>
                         {highestCompletedDay >= 14 ? (
                            <button
                                onClick={handleStartEvaluation}
                                className="font-bold text-lg text-yellow-600 hover:underline"
                            >
                                {t('myConsciousMovements.plan.evaluateProgressButton')}
                            </button>
                         ) : (
                            <div className="font-bold text-lg text-yellow-600">{t('myConsciousMovements.plan.goal')}</div>
                         )}
                    </div>
                </div>
            </div>

            {activeModalItem && <ActivityModal item={activeModalItem} onClose={() => setActiveModalItem(null)} onComplete={handleCompleteDay} />}
            {showCompletionModal && <CompletionModal onClose={() => setShowCompletionModal(false)} />}
        </div>
    );
};

export default TwoWeekPlanWidget;
