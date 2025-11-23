import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Activity, Building2, KeySquare, Users } from 'lucide-react';
import { fetchDashboard } from '../api/adminClient';
import { useAdminAuth } from '../context/AdminAuthContext';
import { AdminDashboardStats } from '../types';

const AdminDashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const { token } = useAdminAuth();
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetchDashboard(token);
        setStats(response);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Unable to load dashboard');
      }
    };
    load();
  }, [token]);

  const cards = [
    {
      title: t('admin.dashboard.totalSchools'),
      value: stats?.totalSchools ?? '—',
      icon: <Building2 className="w-6 h-6 text-animik-dark" />, 
    },
    {
      title: t('admin.dashboard.totalLicenses'),
      value: stats?.totalLicenses ?? '—',
      icon: <KeySquare className="w-6 h-6 text-animik-dark" />, 
    },
    {
      title: t('admin.dashboard.activeLicenses'),
      value: stats?.activeLicenses ?? '—',
      icon: <Activity className="w-6 h-6 text-animik-dark" />, 
    },
    {
      title: t('admin.dashboard.panelUsers'),
      value: stats?.panelUsers ?? '—',
      icon: <Users className="w-6 h-6 text-animik-dark" />, 
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-600">{t('admin.dashboard.subtitle')}</p>
        <h1 className="text-3xl font-bold text-animik-dark">{t('admin.dashboard.title')}</h1>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
            <div className="p-3 bg-animik-yellow/30 rounded-lg">{card.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <p className="text-2xl font-bold text-animik-dark">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-animik-dark mb-2">{t('admin.dashboard.bridgeTitle')}</h2>
        <p className="text-gray-600">{t('admin.dashboard.bridgeCopy')}</p>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
