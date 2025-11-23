import React from 'react';
import { NavLink } from 'react-router-dom';
import { Building2, Home, KeySquare, ListChecks, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAdminAuth } from '../context/AdminAuthContext';

const linkBase = 'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors';

const activeClass = `${linkBase} bg-animik-yellow text-animik-dark font-semibold`;
const inactiveClass = `${linkBase} text-gray-200 hover:bg-white/10`;

const AdminSidebar: React.FC = () => {
  const { t } = useTranslation();
  const { logout } = useAdminAuth();

  return (
    <aside className="bg-animik-dark text-white w-full lg:w-64 min-h-screen p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-animik-yellow text-animik-dark font-bold grid place-items-center">
          AK
        </div>
        <div>
          <p className="text-sm text-gray-300">{t('admin.layout.appNamespace')}</p>
          <p className="font-semibold">AdminiKind</p>
        </div>
      </div>

      <nav className="space-y-2">
        <NavLink to="/admin" className={({ isActive }) => (isActive ? activeClass : inactiveClass)} end>
          <Home className="w-5 h-5" />
          <span>{t('admin.sidebar.dashboard')}</span>
        </NavLink>

        <NavLink to="/admin/schools" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
          <Building2 className="w-5 h-5" />
          <span>{t('admin.sidebar.schools')}</span>
        </NavLink>

        <NavLink to="/admin/licenses" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
          <KeySquare className="w-5 h-5" />
          <span>{t('admin.sidebar.licenses')}</span>
        </NavLink>

        <NavLink to="/admin/logs" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
          <ListChecks className="w-5 h-5" />
          <span>{t('admin.sidebar.logs')}</span>
        </NavLink>

        <div className="pt-4 border-t border-white/10">
          <button onClick={logout} className={`${inactiveClass} w-full text-left`}>
            <LogOut className="w-5 h-5" />
            <span>{t('admin.sidebar.logout')}</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
