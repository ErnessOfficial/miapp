
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BookMarked } from 'lucide-react';

interface LecturasRecomendadasWidgetProps {
  category: 'leve' | 'moderado' | 'alto';
}

const LecturasRecomendadasWidget: React.FC<LecturasRecomendadasWidgetProps> = ({ category }) => {
  const { t } = useTranslation();

  const handleRedirect = () => {
    const urls = {
      leve: 'https://www.entrepalabrasurgentes.com/lecturas-recomendadas-atención-leve',
      moderado: 'https://www.entrepalabrasurgentes.es/lecturas-recomendadas-atención-moderada',
      alto: 'https://www.entrepalabrasurgentes.com/lecturas-recomendadas-atención-alto',
    };
    const url = urls[category];
    
    console.log("Redirecting to:", url); // For debugging
    
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-animik-peach/20 p-6 rounded-2xl border-l-4 border-animik-peach">
      <h3 className="flex items-center gap-2 text-xl font-bold text-animik-dark mb-3">
        <BookMarked className="w-6 h-6 text-animik-peach" />
        <span>{t('myConsciousMovements.recommendedReadings.title')}</span>
      </h3>
      <p className="text-sm text-gray-700 mb-6">
        {t('myConsciousMovements.recommendedReadings.description')}
      </p>
      <div className="text-center">
        <button
          onClick={handleRedirect}
          className="py-2 px-6 bg-animik-lilac text-white font-semibold rounded-lg shadow-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 transform hover:scale-105"
        >
          {t('myConsciousMovements.recommendedReadings.buttonText')}
        </button>
      </div>
    </div>
  );
};

export default LecturasRecomendadasWidget;
