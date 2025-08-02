
import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../context/UserContext';
import { GoogleGenAI } from '@google/genai';
import { WisdomDrop } from '../types';
import { Sparkles, Heart, RefreshCw, Sun } from 'lucide-react';

const NewPlanSummaryPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { cycleNumber, cycleReflections, addWisdomDrop, resetCycleReflections, setShowWisdomDropNotification } = useUser();
  const hasTriggeredRef = useRef(false);

  const { aiResult, newScore } = location.state || {
    aiResult: { evolution: 'mantenido', summary: 'No summary available.' },
    newScore: 0,
  };

  useEffect(() => {
    if (hasTriggeredRef.current) return;
    
    const generateStory = async () => {
      if (Object.keys(cycleReflections).length > 0) {
        hasTriggeredRef.current = true;
        
        const words = Object.entries(cycleReflections)
            .map(([day, text]) => `Día ${day}: ${text}`)
            .join('\n');
            
        const prompt = t('wisdomDrops.geminiPrompt', { userWords: words });
        
        try {
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
          });
          
          const storyText = response.text;
          
          const newWisdomDrop: WisdomDrop = {
            id: `wd-${Date.now()}`,
            cycleNumber: cycleNumber - 1, // The cycle that just finished
            story: storyText,
            inspiringWords: cycleReflections,
            date: new Date().toISOString(),
            isNew: true,
          };
          
          addWisdomDrop(newWisdomDrop);
          resetCycleReflections();
          setShowWisdomDropNotification(true);
          
        } catch (error) {
          console.error("Failed to generate wisdom drop story:", error);
          // Don't block the user, just log the error.
        }
      }
    };

    generateStory();

  }, [cycleReflections, addWisdomDrop, resetCycleReflections, t, cycleNumber, setShowWisdomDropNotification]);

  const content = {
    mejorado: {
      title: t('newPlanSummary.improvementTitle'),
      message: t('newPlanSummary.improvementMessage'),
      Icon: Sun,
      color: 'text-yellow-500'
    },
    mantenido: {
      title: t('newPlanSummary.stabilityTitle'),
      message: t('newPlanSummary.stabilityMessage'),
      Icon: Heart,
      color: 'text-green-500'
    },
    empeorado: {
      title: t('newPlanSummary.declineTitle'),
      message: t('newPlanSummary.declineMessage'),
      Icon: RefreshCw,
      color: 'text-blue-500'
    },
  }[aiResult.evolution] || { title: '', message: '', Icon: Sparkles, color: 'text-gray-500' };

  return (
    <div className="min-h-full bg-gradient-to-br from-animik-sky/20 to-animik-peach/20 p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-2xl text-center transform transition-all duration-500 animate-in fade-in zoom-in-95">
        <content.Icon className={`w-16 h-16 mx-auto mb-4 ${content.color}`} />
        <h1 className="text-3xl font-bold text-animik-dark">{content.title}</h1>
        <p className="text-gray-500 mt-2 mb-6">{content.message}</p>

        <div className="bg-animik-gray p-6 rounded-xl space-y-4 text-left">
            <div>
              <h3 className="font-semibold text-animik-dark">{t('newPlanSummary.aiSummaryTitle')}</h3>
              <p className="text-sm text-gray-700 italic">"{aiResult.summary}"</p>
            </div>
             <div>
              <h3 className="font-semibold text-animik-dark">{t('newPlanSummary.newWellbeingLevel')}</h3>
              <p className="text-2xl font-bold text-animik-dark">{newScore.toFixed(0)}%</p>
            </div>
        </div>
        
        <p className="text-sm text-gray-600 mt-6">{t('newPlanSummary.welcomeToNewCycle', { cycleNumber })}</p>

        <button
          onClick={() => navigate('/my-actions', { replace: true })}
          className="mt-4 w-full py-3 px-6 bg-animik-lilac text-white font-semibold rounded-lg shadow-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300"
        >
          {t('newPlanSummary.startNewPlanButton')}
        </button>
      </div>
    </div>
  );
};

export default NewPlanSummaryPage;
