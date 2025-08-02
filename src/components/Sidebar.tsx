
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { X, LayoutDashboard, MessageSquare, BookOpen, Heart, Target, UserCircle, LogOut, ClipboardList, Droplets } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { logout, wisdomDrops } = useUser();

    const handleLanguageChange = (lang: 'es' | 'en') => {
        i18n.changeLanguage(lang);
    };

    const currentLang = i18n.language;

    const hasNewWisdomDrop = wisdomDrops.some(drop => drop.isNew);

    const navItems = [
        { to: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, text: t('sidebar.dashboard') },
        { to: '/my-actions', icon: <ClipboardList className="w-5 h-5" />, text: t('sidebar.myConsciousMovements') },
        { to: '/chat', icon: <MessageSquare className="w-5 h-5" />, text: t('sidebar.chat') },
        { to: '/journal', icon: <BookOpen className="w-5 h-5" />, text: t('sidebar.writingMyStory') },
        { to: '/wisdom-drops', icon: <Droplets className="w-5 h-5" />, text: t('sidebar.wisdomDrops'), notification: hasNewWisdomDrop },
        { to: '/challenges', icon: <Target className="w-5 h-5" />, text: t('sidebar.braveSteps') },
    ];
    
    const commonLinkClasses = 'flex items-center justify-between space-x-3 px-3 py-2.5 rounded-lg transition-colors duration-200';
    const activeLinkClasses = 'bg-animik-lilac/20 text-animik-lilac font-semibold';
    const inactiveLinkClasses = 'text-gray-600 hover:bg-gray-100 hover:text-animik-dark';
    
    const implementedRoutes = ['/dashboard', '/chat', '/my-actions', '/journal', '/wisdom-drops'];

    const handleNavClick = (path: string) => {
        if (implementedRoutes.includes(path)) {
            navigate(path);
        } else {
            alert(t('common.comingSoon'));
        }
        setIsOpen(false); // Close sidebar on mobile after navigation
    }

    const getLinkClass = ({ isActive, to }: { isActive: boolean; to: string }) => {
      return `${commonLinkClasses} ${isActive && implementedRoutes.includes(to) ? activeLinkClasses : inactiveLinkClasses}`;
    }
    
    const handleLogout = () => {
        logout();
        setIsOpen(false);
    }

    return (
        <>
            {/* Overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black/60 z-30 lg:hidden ${isOpen ? 'block' : 'hidden'}`}
                onClick={() => setIsOpen(false)}
            ></div>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col z-40 lg:translate-x-0 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between h-20 p-4 border-b border-gray-200">
                         <div className="flex items-center space-x-2">
                            <img src="/logo-animik.png" alt={t('common.appName')} className="h-10" />
                            <div className="border-l h-8 border-gray-200"></div>
                            <img src="/logo-epu.png" alt={t('header.epuLogoAlt')} className="h-8" />
                        </div>
                        <button
                            className="p-2 rounded-md lg:hidden text-gray-500 hover:bg-gray-100"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close menu"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    
                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2">
                        {navItems.map(item => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(item.to);
                                }}
                                className={({ isActive }) => getLinkClass({ isActive, to: item.to })}
                            >
                                <div className="flex items-center space-x-3">
                                    {item.icon}
                                    <span>{item.text}</span>
                                </div>
                                {item.notification && (
                                    <span className="w-2.5 h-2.5 bg-animik-sky rounded-full animate-pulse"></span>
                                )}
                            </NavLink>
                        ))}
                    </nav>
                    
                    {/* Footer - Profile & Language */}
                    <div className="p-4 border-t border-gray-200">
                        <div className="space-y-2 mb-4">
                            <a href="#" onClick={(e) => { e.preventDefault(); alert(t('common.comingSoon')); setIsOpen(false);}} className={`${commonLinkClasses} ${inactiveLinkClasses}`}>
                                <UserCircle className="w-5 h-5" />
                                <span>{t('sidebar.profile')}</span>
                            </a>
                            <button onClick={handleLogout} className={`${commonLinkClasses} ${inactiveLinkClasses} w-full`}>
                                <LogOut className="w-5 h-5" />
                                <span>{t('sidebar.logout')}</span>
                            </button>
                        </div>
                        <div className="flex items-center justify-center bg-animik-gray p-1 rounded-full" role="group" aria-label={t('header.language')}>
                            <button
                                onClick={() => handleLanguageChange('es')}
                                className={`px-3 py-1 w-full text-sm font-semibold rounded-full transition-colors duration-300 ${
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
                                className={`px-3 py-1 w-full text-sm font-semibold rounded-full transition-colors duration-300 ${
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
            </aside>
        </>
    );
}
export default Sidebar;
