
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface NavCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  path: string;
}

const NavCard: React.FC<NavCardProps> = ({ icon, title, description, path }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    // Handle navigation for implemented routes and show alerts for future features.
    if (path === '/chat') {
      navigate(path);
    } else {
      alert(t('common.comingSoon'));
    }
  };

  return (
    <div
      onClick={handleClick}
      className="block bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-animik-dark">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default NavCard;
