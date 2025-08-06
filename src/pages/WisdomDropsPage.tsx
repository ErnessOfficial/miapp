
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../context/UserContext';
import { Droplets } from 'lucide-react';
import { WisdomDrop } from '../../types';
import ReflectiveStoryInfographic from '../components/wisdom/ReflectiveStoryInfographic';

const WisdomDropsPage: React.FC = () => {
    const { t } = useTranslation();
    const { wisdomDrops, setShowWisdomDropNotification } = useUser();
    const [selectedDrop, setSelectedDrop] = useState<WisdomDrop | null>(null);

    useEffect(() => {
        // When the user visits this page, dismiss the main dashboard notification
        setShowWisdomDropNotification(false);
    }, [setShowWisdomDropNotification]);

    return (
        <div className="w-full max-w-5xl mx-auto animate-in fade-in duration-500">
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-animik-dark">
                    {t('wisdomDrops.title')}
                </h1>
                <p className="text-gray-500 mt-2 text-lg">
                    {t('wisdomDrops.emptyMessage')}
                </p>
            </div>

            <div className="space-y-4">
                {wisdomDrops.length > 0 ? (
                    wisdomDrops.map(drop => (
                        <div
                            key={drop.id}
                            onClick={() => setSelectedDrop(drop)}
                            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex justify-between items-center"
                        >
                            <div className="flex items-center gap-4">
                                <Droplets className="w-8 h-8 text-animik-sky" />
                                <div>
                                    <p className="font-semibold text-animik-dark">{t('wisdomDrops.storyTitle', { cycleNumber: drop.cycleNumber })}</p>
                                    <p className="text-xs text-gray-500">{new Date(drop.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                            {drop.isNew && (
                                <span className="bg-animik-pink text-white text-xs font-bold px-2.5 py-1 rounded-full">{t('wisdomDrops.newTag')}</span>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">{t('wisdomDrops.emptyMessage')}</p>
                    </div>
                )}
            </div>

            {selectedDrop && (
                <ReflectiveStoryInfographic
                    drop={selectedDrop}
                    onClose={() => setSelectedDrop(null)}
                />
            )}
        </div>
    );
};

export default WisdomDropsPage;
