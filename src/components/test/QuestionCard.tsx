import React from 'react';
import { useTranslation } from 'react-i18next';
import { WellbeingQuestion, PostPlanQuestion } from '../../../types';

interface QuestionCardProps {
  question: WellbeingQuestion | PostPlanQuestion;
  onAnswerSelect: (score: number) => void;
  selectedScore?: number;
  onNext: () => void;
  questionNamespace: 'diagnosticTest' | 'postPlanTest';
  buttonText?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswerSelect, selectedScore, onNext, questionNamespace, buttonText }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg animate-in fade-in duration-500">
      <h2 className="text-xl font-semibold text-animik-dark mb-6 text-center">
        {t(`${questionNamespace}.questions.${question.questionKey}.question`)}
      </h2>
      <div className="space-y-4">
        {question.options.map((option) => (
          <button
            key={option.score}
            onClick={() => onAnswerSelect(option.score)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 text-base ${
              selectedScore === option.score
                ? 'bg-animik-lilac/20 border-animik-lilac text-animik-dark font-semibold shadow-md'
                : 'bg-white border-gray-200 text-gray-700 hover:border-animik-lilac/50 hover:bg-animik-lilac/10'
            }`}
          >
            {t(`${questionNamespace}.questions.${question.questionKey}.options.${option.textKey}`)}
          </button>
        ))}
      </div>
      <div className="mt-8">
        <button
          onClick={onNext}
          disabled={selectedScore === undefined}
          className="w-full py-3 px-6 bg-animik-dark text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-animik-dark transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {buttonText || t('diagnosticTest.nextButton')}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;