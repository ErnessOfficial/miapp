import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminHeader: React.FC = () => {
  const { t } = useTranslation();
  const { admin, logout } = useAdminAuth();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <ShieldCheck className="text-animik-dark w-6 h-6" />
        <div>
          <p className="text-sm text-gray-500">{t('admin.layout.sessionStatus')}</p>
          <p className="font-semibold text-animik-dark">
            {admin?.displayName || admin?.email || t('admin.layout.adminUser')}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-600">{t('admin.layout.secureSession')}</div>
        <button
          onClick={logout}
          className="px-4 py-2 text-sm font-semibold bg-animik-dark text-white rounded-lg hover:bg-animik-dark/90"
        >
          {t('admin.layout.logout')}
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
