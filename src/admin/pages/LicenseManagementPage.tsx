import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, RefreshCw, Search, ShieldAlert, UserRoundPlus } from 'lucide-react';
import { addPanelUser, fetchPanelUsers, fetchSchools, togglePanelUser, updatePanelUser } from '../api/adminClient';
import { useAdminAuth } from '../context/AdminAuthContext';
import { PanelUser, SchoolAccount } from '../types';

const LicenseManagementPage: React.FC = () => {
  const { t } = useTranslation();
  const { token } = useAdminAuth();
  const [schools, setSchools] = useState<SchoolAccount[]>([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [panelUsers, setPanelUsers] = useState<PanelUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAgent, setNewAgent] = useState('');
  const [newGrade, setNewGrade] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  useEffect(() => {
    const loadSchools = async () => {
      try {
        const data = await fetchSchools(token);
        setSchools(data);
        if (data.length && !selectedSchool) {
          setSelectedSchool(data[0].schoolId);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : t('admin.licenses.apiError'));
      }
    };
    loadSchools();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, t]);

  useEffect(() => {
    const loadUsers = async () => {
      if (!selectedSchool) return;
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPanelUsers(selectedSchool, token);
        setPanelUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : t('admin.licenses.apiError'));
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [selectedSchool, token, t]);

  const handleAddUser = async () => {
    if (!selectedSchool) return;
    setError(null);
    try {
      const created = await addPanelUser(
        { schoolId: selectedSchool, assignedAgent: newAgent, defaultGrade: newGrade },
        token
      );
      setPanelUsers((prev) => [...prev, created]);
      setGeneratedCode(created.linkCode);
      setShowCreateModal(false);
      setNewAgent('');
      setNewGrade('');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('admin.licenses.apiError'));
    }
  };

  const handleToggle = async (panelUserId: string, isActive: boolean) => {
    setError(null);
    try {
      const updated = await togglePanelUser(panelUserId, !isActive, token);
      setPanelUsers((prev) => prev.map((user) => (user.panelUserId === panelUserId ? updated : user)));
    } catch (err) {
      setError(err instanceof Error ? err.message : t('admin.licenses.apiError'));
    }
  };

  const handleUpdate = async (panelUserId: string, assignedAgent: string) => {
    setError(null);
    try {
      const updated = await updatePanelUser(panelUserId, { assignedAgent }, token);
      setPanelUsers((prev) => prev.map((user) => (user.panelUserId === panelUserId ? updated : user)));
    } catch (err) {
      setError(err instanceof Error ? err.message : t('admin.licenses.apiError'));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-600">{t('admin.licenses.subtitle')}</p>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-animik-dark">{t('admin.licenses.title')}</h1>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-animik-dark text-white rounded-lg hover:bg-animik-dark/90"
              onClick={() => setShowCreateModal(true)}
              disabled={!selectedSchool}
            >
              <UserRoundPlus className="w-4 h-4" /> {t('admin.licenses.addUser')}
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 border border-animik-dark text-animik-dark rounded-lg hover:bg-animik-dark/5"
              onClick={() => setSelectedSchool(selectedSchool)}
            >
              <RefreshCw className="w-4 h-4" />
              {t('admin.licenses.refresh')}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex gap-3 items-center">
          <ShieldAlert className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">{t('admin.licenses.filterLabel')}</p>
              <p className="font-semibold text-animik-dark">
                {schools.find((school) => school.schoolId === selectedSchool)?.schoolName || t('admin.licenses.noSchool')}
              </p>
            </div>
          </div>
          <select
            value={selectedSchool}
            onChange={(event) => setSelectedSchool(event.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2"
          >
            {schools.map((school) => (
              <option key={school.schoolId} value={school.schoolId}>
                {school.schoolName} ({school.schoolId})
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-3 py-2">{t('admin.licenses.panelUserId')}</th>
                <th className="px-3 py-2">{t('admin.licenses.linkCode')}</th>
                <th className="px-3 py-2">{t('admin.licenses.assignedAgent')}</th>
                <th className="px-3 py-2">{t('admin.licenses.defaultGrade')}</th>
                <th className="px-3 py-2">{t('admin.licenses.status')}</th>
                <th className="px-3 py-2 text-right">{t('admin.licenses.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {panelUsers.map((user) => (
                <tr key={user.panelUserId} className="text-sm">
                  <td className="px-3 py-2 font-medium text-animik-dark">{user.panelUserId}</td>
                  <td className="px-3 py-2">
                    <code className="px-2 py-1 bg-gray-100 rounded text-xs">{user.linkCode}</code>
                  </td>
                  <td className="px-3 py-2">
                    <input
                      defaultValue={user.assignedAgent}
                      className="w-full border border-gray-200 rounded px-2 py-1 text-sm"
                      onBlur={(event) => handleUpdate(user.panelUserId, event.target.value)}
                    />
                  </td>
                  <td className="px-3 py-2">{user.defaultGrade}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {user.isActive ? t('admin.licenses.active') : t('admin.licenses.inactive')}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right space-x-2">
                    <button
                      onClick={() => handleToggle(user.panelUserId, user.isActive)}
                      className="px-3 py-1 rounded-lg border border-animik-dark text-animik-dark hover:bg-animik-dark/5"
                    >
                      {user.isActive ? t('admin.licenses.deactivate') : t('admin.licenses.activate')}
                    </button>
                  </td>
                </tr>
              ))}
              {!panelUsers.length && (
                <tr>
                  <td colSpan={6} className="text-center text-gray-500 py-6">
                    {loading ? t('admin.licenses.loading') : t('admin.licenses.noUsers')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {generatedCode && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-3">
          <CheckCircle className="w-5 h-5" />
          <div>
            <p className="font-semibold">{t('admin.licenses.generatedCodeTitle')}</p>
            <p className="text-sm">{t('admin.licenses.generatedCodeCopy', { code: generatedCode })}</p>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm grid place-items-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg space-y-4">
            <h3 className="text-xl font-semibold text-animik-dark">{t('admin.licenses.addUser')}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('admin.licenses.assignedAgent')}</label>
                <input
                  value={newAgent}
                  onChange={(event) => setNewAgent(event.target.value)}
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="agent@animikind.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('admin.licenses.defaultGrade')}</label>
                <input
                  value={newGrade}
                  onChange={(event) => setNewGrade(event.target.value)}
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="K-12"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 border border-gray-200 rounded-lg"
                onClick={() => setShowCreateModal(false)}
              >
                {t('common.cancel')}
              </button>
              <button
                className="px-4 py-2 bg-animik-dark text-white rounded-lg"
                onClick={handleAddUser}
                disabled={!selectedSchool}
              >
                {t('common.save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LicenseManagementPage;
