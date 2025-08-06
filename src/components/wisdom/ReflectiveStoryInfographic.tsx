
import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { WisdomDrop } from '../../../types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import WisdomDropIntroAnimation from './WisdomDropIntroAnimation';
import { useUser } from '../../../context/UserContext';

interface ReflectiveStoryInfographicProps {
  drop: WisdomDrop;
  onClose: () => void;
}

const ReflectiveStoryInfographic: React.FC<ReflectiveStoryInfographicProps> = ({ drop, onClose }) => {
  const { t } = useTranslation();
  const { markWisdomDropAsViewed } = useUser();
  const [showIntro, setShowIntro] = useState(drop.isNew);
  const [currentPanel, setCurrentPanel] = useState(0);

  const storyPanels = useMemo(() => {
    return drop.story.split('\n').filter(p => p.trim() !== '');
  }, [drop.story]);
  
  useEffect(() => {
    if (drop.isNew) {
      const timer = setTimeout(() => {
        setShowIntro(false);
        markWisdomDropAsViewed(drop.id);
      }, 3500); // Duration of the intro animation + a little buffer
      return () => clearTimeout(timer);
    }
  }, [drop.isNew, drop.id, markWisdomDropAsViewed]);

  const handleNext = () => {
    if (currentPanel < storyPanels.length - 1) {
      setCurrentPanel(currentPanel + 1);
    }
  };

  const handlePrev = () => {
    if (currentPanel > 0) {
      setCurrentPanel(currentPanel - 1);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-animik-warm-beige rounded-2xl shadow-xl w-full max-w-2xl h-[90vh] max-h-[700px] p-6 flex flex-col relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-black/10 text-white hover:bg-black/20 z-20">
            <X className="w-5 h-5" />
        </button>
        
        {showIntro ? (
            <WisdomDropIntroAnimation />
        ) : (
            <div className="flex flex-col h-full animate-in fade-in duration-500">
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-animik-dark">{t('wisdomDrops.infographic.title', { cycleNumber: drop.cycleNumber })}</h2>
                    <p className="text-sm text-gray-500">{t('wisdomDrops.infographic.subtitle')}</p>
                </div>

                <div className="flex-grow flex items-center justify-center relative">
                    {storyPanels.map((panel, index) => (
                        <div key={index} className={`absolute w-full h-full transition-opacity duration-500 flex items-center justify-center p-4 ${index === currentPanel ? 'opacity-100' : 'opacity-0'}`}>
                           <p className="text-lg text-animik-dark text-center leading-relaxed italic">{panel}</p>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between mt-4">
                     <button onClick={handlePrev} disabled={currentPanel === 0} className="p-3 rounded-full bg-white/50 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed">
                        <ChevronLeft className="w-6 h-6 text-animik-dark" />
                    </button>
                    <div className="flex gap-2">
                        {storyPanels.map((_, index) => (
                            <div key={index} className={`w-2.5 h-2.5 rounded-full transition-colors ${index === currentPanel ? 'bg-animik-dark' : 'bg-gray-300'}`}></div>
                        ))}
                    </div>
                    <button onClick={handleNext} disabled={currentPanel === storyPanels.length - 1} className="p-3 rounded-full bg-white/50 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed">
                        <ChevronRight className="w-6 h-6 text-animik-dark" />
                    </button>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default ReflectiveStoryInfographic;
