import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { diagnosticQuestions } from '../data/testData';

const DiagnosticTestPage: React.FC = () => {
  const { t } = useTranslation();
  const [answers, setAnswers] = useState<(string | null)[]>(Array(diagnosticQuestions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{t('diagnostic.title')}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {diagnosticQuestions.map((question, idx) => (
          <div key={idx} className="space-y-2">
            <p className="font-semibold">{t(`diagnostic.questions.${question.id}`)}</p>
            <div className="flex gap-4">
              {question.options.map((option) => (
                <label key={option.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`question-${idx}`}
                    value={option.value}
                    checked={answers[idx] === option.value}
                    onChange={() => handleAnswerChange(idx, option.value)}
                    required
                  />
                  {t(`diagnostic.options.${option.label}`)}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="mt-6 px-4 py-2 bg-animik-blue text-white rounded"
        >
          {t('diagnostic.submit')}
        </button>
      </form>
      {submitted && (
        <div className="mt-6 text-green-600">
          {t('diagnostic.submissionMessage')}
        </div>
      )}
    </div>
  );
};

export default DiagnosticTestPage;
