
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserContext';

const AppLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { t } = useTranslation();
  const { user, isEmpatheticMode } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // This effect protects the route. If there's no user, redirect to login.
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Don't render anything if there's no user, as we are about to redirect.
  if (!user) {
    return null; 
  }

  return (
    <div className={`relative min-h-screen bg-animik-gray lg:flex ${isEmpatheticMode ? 'empathetic-mode-bg' : ''}`}>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {isEmpatheticMode && (
          <div className="particles">
              {Array.from({ length: 15 }).map((_, i) => (
                  <div 
                      key={i} 
                      className="particle" 
                      style={{ 
                          left: `${Math.random() * 100}%`,
                          width: `${Math.random() * 5 + 2}px`,
                          height: `${Math.random() * 5 + 2}px`,
                          animationDelay: `${Math.random() * 25}s`,
                          animationDuration: `${15 + Math.random() * 10}s`,
                      }}
                  />
              ))}
          </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col transition-all duration-300 lg:ml-64 relative z-10">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 bg-white/80 backdrop-blur-sm z-20 flex items-center justify-between p-4 border-b border-gray-200">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-md text-animik-dark hover:bg-gray-200"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <img src="/logo-animik.png" alt={t('common.appName')} className="h-8" />
          <div className="w-8"></div> {/* Spacer */}
        </header>

        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
