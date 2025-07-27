

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, CheckCircle, AlertTriangle, XCircle, Loader2, AlertCircle as AlertCircleError } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import TwoWeekPlanWidget from '../components/actions/TwoWeekPlanWidget';
import LecturasRecomendadasWidget from '../components/actions/LecturasRecomendadasWidget';
import { GoogleGenAI, Type } from '@google/genai';

interface PlanItem {
  day: number;
  action: string;
  explanation: string;
}

const translationKeyMap = {
  alto: 'highAttention',
  moderado: 'moderateAttention',
  leve: 'lowAttention'
};

const MyActionsPage: React.FC = () => {
  const { t } = useTranslation();
  const { wellbeingHistory, currentPlan, setCurrentPlan } = useUser();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const latestResult = wellbeingHistory.length > 0 ? wellbeingHistory[0] : null;

  useEffect(() => {
    if (!latestResult) {
      setIsLoading(false);
      return;
    }
    
    // If a plan already exists in context, don't fetch a new one.
    if(currentPlan) {
      setIsLoading(false);
      return;
    }

    const category = latestResult.category;
    const translationKey = translationKeyMap[category];
    const prompt = t(`myConsciousMovements.${translationKey}.geminiPrompt`);
    const schema = {
        type: Type.OBJECT,
        properties: {
            plan: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        day: { type: Type.INTEGER },
                        action: { type: Type.STRING },
                        explanation: { type: Type.STRING },
                    },
                    required: ['day', 'action', 'explanation'],
                },
            },
        },
        required: ['plan'],
    };

    const fetchInitialPlan = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: { responseMimeType: "application/json", responseSchema: schema }
            });
            const jsonResponse = JSON.parse(response.text);
            setCurrentPlan(jsonResponse.plan);
        } catch (err) {
            console.error("Error fetching Gemini plan:", err);
            setError(t(`myConsciousMovements.${translationKey}.planError`));
        } finally {
            setIsLoading(false);
        }
    };

    fetchInitialPlan();
  }, [latestResult, t, currentPlan, setCurrentPlan]);


  const attentionLevelConfig = {
    leve: { Icon: CheckCircle, color: 'text-green-500 bg-green-100', textKey: 'recommendations.attentionLevels.low_title' },
    moderado: { Icon: AlertTriangle, color: 'text-amber-500 bg-amber-100', textKey: 'recommendations.attentionLevels.moderate_title' },
    alto: { Icon: XCircle, color: 'text-red-500 bg-red-100', textKey: 'recommendations.attentionLevels.high_title' },
  };

  const currentConfig = latestResult ? attentionLevelConfig[latestResult.category] : null;

  const renderContent = () => {
    if (isLoading) {
      const loadingKey = latestResult ? `myConsciousMovements.${translationKeyMap[latestResult.category]}.loadingPlan` : '';
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-animik-sky/10 rounded-lg">
          <Loader2 className="w-8 h-8 text-animik-lilac animate-spin mb-4" />
          <p className="text-animik-dark font-semibold">{t(loadingKey)}</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-red-50 rounded-lg border border-red-200">
          <AlertCircleError className="w-8 h-8 text-red-500 mb-4" />
          <p className="text-red-700 font-semibold">{error}</p>
        </div>
      );
    }
    
    if (latestResult && currentPlan) {
      return (
        <div className="space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
              {currentConfig && (
                <div className="flex justify-between items-center border-b pb-6 mb-6 border-gray-200">
                  <div>
                      <h2 className="text-xl font-bold text-animik-dark">{t('myConsciousMovements.plan.purposeTitle')}</h2>
                      <p className="text-gray-600 max-w-2xl">{t('myConsciousMovements.generalMessage.p1')}</p>
                  </div>
                  <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${currentConfig.color}`}>
                    <currentConfig.Icon className="w-5 h-5" />
                    <span>{t(currentConfig.textKey as any)}</span>
                  </div>
                </div>
              )}
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                      <h3 className="text-lg font-semibold text-animik-dark mb-2">{t('myConsciousMovements.plan.objectivesTitle')}</h3>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {currentPlan.map(item => <li key={item.day}>{item.action}</li>)}
                      </ul>
                  </div>
                   <div>
                      <h3 className="text-lg font-semibold text-animik-dark mb-2">{t('myConsciousMovements.plan.instructionsTitle')}</h3>
                      <p className="text-sm text-gray-600">{t('myConsciousMovements.generalMessage.p2')}</p>
                   </div>
              </div>

              <TwoWeekPlanWidget planData={currentPlan} category={latestResult.category} />
            </div>
            
            <LecturasRecomendadasWidget category={latestResult.category} />
        </div>
      );
    }

    return (
       <div className="bg-white p-8 rounded-2xl shadow-lg mt-6 text-center border-2 border-dashed border-animik-peach/50">
          <FileText className="w-16 h-16 mx-auto text-animik-peach mb-4" />
          <p className="text-lg text-gray-600 mb-6">
            {t('myConsciousMovements.noActionsMessage')}
          </p>
          <button
            onClick={() => navigate('/diagnostic-test')}
            className="py-2 px-5 bg-animik-lilac text-white font-semibold rounded-lg shadow-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 transform hover:scale-105"
          >
            {t('myConsciousMovements.goToTestButton')}
          </button>
        </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-animik-dark">
          {t('myConsciousMovements.title')}
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          {t('myConsciousMovements.description')}
        </p>
      </div>
      {renderContent()}
    </div>
  );
};

export default MyActionsPage;