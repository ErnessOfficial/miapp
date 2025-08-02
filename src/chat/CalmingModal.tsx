
import React from 'react';
import { Wind, BrainCircuit } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CalmingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (technique: 'breathing' | 'grounding') => void;
}

const CalmingModal: React.FC<CalmingModalProps> = ({ isOpen, onClose, onSelect }) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="calming-modal-title"
    >
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4 transform transition-all duration-300 scale-95 opacity-0 animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="calming-modal-title" className="text-xl font-semibold text-animik-dark">{t('chat.modal.title')}</h2>
        <p className="text-sm text-gray-500">
          {t('chat.modal.description')}
        </p>

        <div className="space-y-3 pt-2">
            <button
                onClick={() => onSelect('breathing')}
                className="w-full flex items-center text-left p-4 space-x-4 bg-animik-sky/20 hover:bg-animik-sky/40 rounded-lg transition-colors"
            >
                <Wind className="w-6 h-6 text-animik-sky" />
                <div>
                    <h3 className="font-semibold text-animik-dark">{t('chat.modal.breathing.title')}</h3>
                    <p className="text-sm text-gray-600">{t('chat.modal.breathing.description')}</p>
                </div>
            </button>
            <button
                onClick={() => onSelect('grounding')}
                className="w-full flex items-center text-left p-4 space-x-4 bg-animik-peach/30 hover:bg-animik-peach/50 rounded-lg transition-colors"
            >
                <BrainCircuit className="w-6 h-6 text-animik-peach" />
                <div>
                    <h3 className="font-semibold text-animik-dark">{t('chat.modal.grounding.title')}</h3>
                    <p className="text-sm text-gray-600">{t('chat.modal.grounding.description')}</p>
                </div>
            </button>
        </div>
        
        <div className="pt-2">
            <button onClick={onClose} className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors">
                {t('common.close')}
            </button>
        </div>
      </div>
    </div>
  );
};

export default CalmingModal;
