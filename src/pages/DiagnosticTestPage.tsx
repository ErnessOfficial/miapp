import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { diagnosticQuestions } from '../data/testData';
import QuestionCard from '../components/test/QuestionCard';
import TestResults from '../components/test/TestResults';
import TestClosingMessage from '../components/test/TestClosingMessage';
import { WellbeingHistoryEntry } from '../types';
import { useUser } from '../context/UserContext';

const DiagnosticTestPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addWellbeingHistoryEntry } = useUser();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [showClosingMessage, setShowClosingMessage] = useState(false);

  const totalQuestions = diagnosticQuestions.length;

  const handleAnswerSelect = (score: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = score;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (answers[currentQuestionIndex] === undefined) {
      alert(t('diagnosticTest.selectAnswerError'));
      return;
    }
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Instead of calculating results, show the closing message first
      setShowClosingMessage(true);
    }
  };

  const calculateAndSaveResults = () => {
    const totalScore = answers.reduce((sum, score) => sum + score, 0);
    const minScore = totalQuestions * 1;
    const maxScore = totalQuestions * 4;
    
    // Formula to convert score to a 0-100 percentage
    const percentageScore = ((totalScore - minScore) / (maxScore - minScore)) * 100;
    setFinalScore(percentageScore);
    
    let category: 'leve' | 'moderado' | 'alto';
    if (percentageScore >= 70) {
        category = 'leve';
    } else if (percentageScore >= 40) {
        category = 'moderado';
    } else {
        category = 'alto';
    }
    
    const newEntry: WellbeingHistoryEntry = {
        score: percentageScore,
        date: new Date().toLocaleDateString('es-ES'),
        category: category,
    };
    
    // Add the new result to the centralized history via context.
    addWellbeingHistoryEntry(newEntry);

    // For future integration, this is a good place to send the `newEntry`
    // object to a backend or analytics service.
  };
  
  const handleShowResults = () => {
    calculateAndSaveResults();
    setIsTestComplete(true);
  };

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  if (isTestComplete) {
    return <TestResults score={finalScore} />;
  }

  if (showClosingMessage) {
    return <TestClosingMessage onContinue={handleShowResults} />;
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-animik-sky/20 to-animik-peach/20 p-4 sm:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-animik-dark text-center mb-2">
          {t('diagnosticTest.title')}
        </h1>
        <p className="text-center text-gray-500 mb-6">{t('diagnosticTest.progress', { current: currentQuestionIndex + 1, total: totalQuestions })}</p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
          <div
            className="bg-animik-lilac h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <QuestionCard
          question={diagnosticQuestions[currentQuestionIndex]}
          onAnswerSelect={handleAnswerSelect}
          selectedScore={answers[currentQuestionIndex]}
          onNext={handleNextQuestion}
          questionNamespace="diagnosticTest"
        />
      </div>
    </div>
  );
};

export default DiagnosticTestPage;