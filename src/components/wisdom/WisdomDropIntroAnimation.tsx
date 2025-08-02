
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Droplet } from 'lucide-react';

const WisdomDropIntroAnimation: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center text-animik-dark p-4">
      <div className="relative mb-8">
        <Droplet className="w-20 h-20 text-animik-sky animate-drop-fall" />
        <div className="absolute top-1/2 left-1/2 w-full h-full">
            <div className="absolute w-full h-full border-2 border-animik-sky/50 rounded-full animate-ripple [animation-delay:0s]"></div>
            <div className="absolute w-full h-full border-2 border-animik-sky/50 rounded-full animate-ripple [animation-delay:0.5s]"></div>
            <div className="absolute w-full h-full border-2 border-animik-sky/50 rounded-full animate-ripple [animation-delay:1s]"></div>
        </div>
      </div>
      <p className="text-lg italic animate-in fade-in-50 slide-in-from-bottom-5 duration-1000 delay-500 fill-mode-forwards">
        {t('wisdomDrops.introMessage')}
      </p>
    </div>
  );
};

export default WisdomDropIntroAnimation;
