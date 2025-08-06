import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import{ useUser } from '../../context/UserContext';
import { postPlanQuestions } from '../data/postPlanTestData';
import { Loader2 } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai';
import { WellbeingHistoryEntry, JournalEntry } from '../../types';
import QuestionCard from '../components/test/QuestionCard';

const PostPlanTestPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addWellbeingHistoryEntry, setCurrentPlan, resetPlan, addJournalEntry } = useUser();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number|null)[]>(Array(postPlanQuestions.length).fill(null));
  const [isLoading, setIsLoading] = useState(false);
  const totalQuestions = postPlanQuestions.length;

  const handleAnswerSelect = (score: number) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = score;
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (answers[currentQuestionIndex] === null) {
      alert(t('diagnosticTest.selectAnswerError'));
      return;
    }
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // 1. Calculate score
    const totalScore = answers.reduce((sum, score) => sum + (score || 0), 0);
    const minScore = totalQuestions * 1;
    const maxScore = totalQuestions * 4;
    const percentageScore = ((totalScore - minScore) / (maxScore - minScore)) * 100;

    // 2. Prepare data for AI
    const userAnswersText = postPlanQuestions.map((q, i) => {
      const questionText = t(`postPlanTest.questions.${q.questionKey}.question`);
      const selectedOptionScore = answers[i];
      const selectedOption = q.options.find(opt => opt.score === selectedOptionScore);
      const answerText = selectedOption ? t(`postPlanTest.questions.${q.questionKey}.options.${selectedOption.textKey}`) : "No answer";
      return `Q: ${questionText}\nA: ${answerText}`;
    }).join('\n\n');

    const prompt = t('postPlanTest.geminiPrompt', { userAnswers: userAnswersText });
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { 
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              evolution: { type: Type.STRING },
              new_plan: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: { day: { type: Type.INTEGER }, action: { type: Type.STRING }, explanation: { type: Type.STRING } },
                  required: ['day', 'action', 'explanation']
                }
              }
            },
            required: ['summary', 'evolution', 'new_plan']
          }
        }
      });
      
      const aiResult = JSON.parse(response.text);

      // 3. Update user state
      let category: 'leve' | 'moderado' | 'alto';
      if (percentageScore >= 70) category = 'leve';
      else if (percentageScore >= 40) category = 'moderado';
      else category = 'alto';

      addWellbeingHistoryEntry({ score: percentageScore, date: new Date().toLocaleDateString('es-ES'), category });
      setCurrentPlan(aiResult.new_plan);
      resetPlan();
      
      const summaryJournalEntry: JournalEntry = {
        id: `summary-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        emotion: 'reflection',
        influences: [{ id: 'plan-end', text: 'Fin de Ciclo del Plan', isCustom: false }],
        text: `**Resumen de AnImiK:**\n${aiResult.summary}`,
        reflection: "Reflexión Final – Plan AnImiK14 Ciclo 1"
      };
      addJournalEntry(summaryJournalEntry);
      
      // 4. Navigate to summary page with results
      navigate('/new-plan-summary', { state: { aiResult, newScore: percentageScore } });

    } catch (err) {
      console.error("Error processing post-plan test:", err);
      alert("Hubo un error al procesar tu evolución. Por favor, inténtalo de nuevo.");
      setIsLoading(false);
    }
  };

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-full bg-gradient-to-br from-animik-sky/20 to-animik-peach/20 p-4 sm:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-animik-dark text-center mb-2">
          {t('postPlanTest.title')}
        </h1>
        <p className="text-center text-gray-500 mb-6">{t('postPlanTest.progress', { current: currentQuestionIndex + 1, total: totalQuestions })}</p>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
          <div className="bg-animik-lilac h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        {isLoading ? (
            <div className="flex flex-col items-center justify-center p-8 text-center bg-white/50 rounded-lg">
              <Loader2 className="w-12 h-12 text-animik-lilac animate-spin mb-4" />
              <p className="text-animik-dark font-semibold">Analizando tu evolución...</p>
            </div>
        ) : (
             <QuestionCard
                question={postPlanQuestions[currentQuestionIndex]}
                onAnswerSelect={handleAnswerSelect}
                selectedScore={answers[currentQuestionIndex] ?? undefined}
                onNext={handleNext}
                questionNamespace="postPlanTest"
                buttonText={currentQuestionIndex === totalQuestions - 1 ? t('postPlanTest.submitButton') : t('diagnosticTest.nextButton')}
             />
        )}
      </div>
    </div>
  );
};

export default PostPlanTestPage;