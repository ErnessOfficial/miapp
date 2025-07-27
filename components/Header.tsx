
import React from 'react';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang: 'es' | 'en') => {
    i18n.changeLanguage(lang);
  };

  const currentLang = i18n.language;

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <img src="/logo-animik.png" alt={t('common.appName')} className="h-10" />
            <div className="border-l h-8 border-gray-200"></div>
            <img src="/logo-epu.png" alt={t('header.epuLogoAlt')} className="h-8" />
          </div>
          <div className="flex items-center">
            <div className="flex items-center bg-animik-gray p-1 rounded-full" role="group" aria-label={t('header.language')}>
              <button
                onClick={() => handleLanguageChange('es')}
                className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${
                  currentLang.startsWith('es')
                    ? 'bg-animik-lilac text-white shadow'
                    : 'text-animik-dark hover:bg-white/50'
                }`}
                aria-pressed={currentLang.startsWith('es')}
              >
                ES
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${
                  currentLang.startsWith('en')
                    ? 'bg-animik-lilac text-white shadow'
                    : 'text-animik-dark hover:bg-white/50'
                }`}
                aria-pressed={currentLang.startsWith('en')}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
