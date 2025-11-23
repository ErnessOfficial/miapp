import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileClock, RefreshCw } from 'lucide-react';
import { fetchLogs } from '../api/adminClient';
import { useAdminAuth } from '../context/AdminAuthContext';
import { AuditLog } from '../types';

const AdminLogsPage: React.FC = () => {
  const { t } = useTranslation();
  const { token } = useAdminAuth();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLogs(token);
      setLogs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('admin.logs.apiError'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, [token]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-600">{t('admin.logs.subtitle')}</p>
          <h1 className="text-3xl font-bold text-animik-dark">{t('admin.logs.title')}</h1>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 border border-animik-dark text-animik-dark rounded-lg hover:bg-animik-dark/5"
          onClick={loadLogs}
        >
          <RefreshCw className="w-4 h-4" />
          {t('admin.logs.refresh')}
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-100">
        {loading && <div className="p-4 text-gray-600">{t('admin.logs.loading')}</div>}
        {!loading && !logs.length && <div className="p-4 text-gray-500">{t('admin.logs.empty')}</div>}

        {logs.map((log) => (
          <div key={log.id} className="p-4 flex items-start gap-3">
            <FileClock className="w-5 h-5 text-animik-dark mt-1" />
            <div>
              <p className="text-sm text-animik-dark font-semibold">{log.action}</p>
              <p className="text-sm text-gray-600">{log.detail}</p>
              <p className="text-xs text-gray-500">
                {log.actor} • {log.target} • {new Date(log.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLogsPage;
