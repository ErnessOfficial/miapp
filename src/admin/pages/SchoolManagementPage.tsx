import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, ShieldAlert } from 'lucide-react';
import { addPanelUser, createSchool, fetchPanelUsers, fetchSchools, togglePanelUser, updatePanelUser } from '../api/adminClient';
import { useAdminAuth } from '../context/AdminAuthContext';
import { PanelUser, SchoolAccount } from '../types';

const SchoolManagementPage: React.FC = () => {
  const { t } = useTranslation();
  const { token } = useAdminAuth();
  const [schools, setSchools] = useState<SchoolAccount[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string>('');
  const [panelUsers, setPanelUsers] = useState<PanelUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isCreatingSchool, setIsCreatingSchool] = useState(false);
  const [newSchoolName, setNewSchoolName] = useState('');
  const [newSchoolLicenses, setNewSchoolLicenses] = useState<number>(10);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUserAgent, setNewUserAgent] = useState('');
  const [newUserGrade, setNewUserGrade] = useState('');

  useEffect(() => {
    const loadSchools = async () => {
      try {
        const data = await fetchSchools(token);
        setSchools(data);
        if (data.length && !selectedSchool) {
          setSelectedSchool(data[0].schoolId);
        }
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Unable to load schools');
      }
    };
    loadSchools();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    const loadUsers = async () => {
      if (!selectedSchool) return;
      try {
        const users = await fetchPanelUsers(selectedSchool, token);
        setPanelUsers(users);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Unable to load panel users');
      }
    };
    loadUsers();
  }, [selectedSchool, token]);

  const selectedSchoolInfo = useMemo(() => schools.find((school) => school.schoolId === selectedSchool), [schools, selectedSchool]);

  const handleCreateSchool = async () => {
    setError(null);
    try {
      const created = await createSchool({ schoolName: newSchoolName, totalLicenses: newSchoolLicenses }, token);
      setSchools((prev) => [...prev, created]);
      setIsCreatingSchool(false);
      setNewSchoolName('');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Unable to create school');
    }
  };

  const handleAddUser = async () => {
    if (!selectedSchool) return;
    setError(null);
    try {
      const added = await addPanelUser(
        {
          schoolId: selectedSchool,
          assignedAgent: newUserAgent,
          defaultGrade: newUserGrade,
        },
        token
      );
      setPanelUsers((prev) => [...prev, added]);
      setIsAddingUser(false);
      setNewUserAgent('');
      setNewUserGrade('');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Unable to add user');
    }
  };

  const handleToggle = async (panelUserId: string, isActive: boolean) => {
    setError(null);
    try {
      const updated = await togglePanelUser(panelUserId, !isActive, token);
      setPanelUsers((prev) => prev.map((user) => (user.panelUserId === panelUserId ? updated : user)));
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Unable to update user');
    }
  };

  const handleUpdateAgent = async (panelUserId: string, agent: string) => {
    setError(null);
    try {
      const updated = await updatePanelUser(panelUserId, { assignedAgent: agent }, token);
      setPanelUsers((prev) => prev.map((user) => (user.panelUserId === panelUserId ? updated : user)));
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Unable to update user');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-600">{t('admin.schools.subtitle')}</p>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-3xl font-bold text-animik-dark">{t('admin.schools.title')}</h1>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-animik-dark text-white rounded-lg hover:bg-animik-dark/90"
              onClick={() => setIsCreatingSchool(true)}
            >
              <Plus className="w-4 h-4" /> {t('admin.schools.newSchool')}
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 border border-animik-dark text-animik-dark rounded-lg hover:bg-animik-dark/5"
              onClick={() => setIsAddingUser(true)}
              disabled={!selectedSchool}
            >
              <Plus className="w-4 h-4" /> {t('admin.licenses.addUser')}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg flex items-center gap-3">
          <ShieldAlert className="w-5 h-5" />
          <div>{error}</div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 xl:col-span-2 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <p className="text-sm text-gray-500">{t('admin.schools.totalLicenses')}</p>
              <p className="text-xl font-semibold text-animik-dark">
                {selectedSchoolInfo?.activeLicenses ?? 0} / {selectedSchoolInfo?.totalLicenses ?? 0}
              </p>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">{t('admin.schools.selectSchool')}</label>
              <select
                className="border border-gray-200 rounded-lg px-3 py-2"
                value={selectedSchool}
                onChange={(event) => setSelectedSchool(event.target.value)}
              >
                {schools.map((school) => (
                  <option key={school.schoolId} value={school.schoolId}>
                    {school.schoolName} ({school.schoolId})
                  </option>
                ))}
              </select>
            </div>
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
                        onBlur={(event) => handleUpdateAgent(user.panelUserId, event.target.value)}
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
                      {t('admin.licenses.noUsers')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="text-xl font-semibold text-animik-dark">{t('admin.schools.overview')}</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>{t('admin.schools.totalSchoolsLabel')}:</strong> {schools.length}
            </p>
            <p>
              <strong>{t('admin.schools.activeLicensesLabel')}:</strong> {selectedSchoolInfo?.activeLicenses ?? 0}
            </p>
            <p>
              <strong>{t('admin.schools.remainingLicensesLabel')}:</strong>{' '}
              {(selectedSchoolInfo?.totalLicenses ?? 0) - (selectedSchoolInfo?.activeLicenses ?? 0)}
            </p>
            <p className="text-gray-600">{t('admin.schools.helperText')}</p>
          </div>
        </div>
      </div>

      {isCreatingSchool && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm grid place-items-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg space-y-4">
            <h3 className="text-xl font-semibold text-animik-dark">{t('admin.schools.newSchool')}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('admin.schools.schoolName')}</label>
                <input
                  value={newSchoolName}
                  onChange={(event) => setNewSchoolName(event.target.value)}
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder={t('admin.schools.schoolPlaceholder')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('admin.schools.totalLicenses')}</label>
                <input
                  type="number"
                  min={1}
                  value={newSchoolLicenses}
                  onChange={(event) => setNewSchoolLicenses(Number(event.target.value))}
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 border border-gray-200 rounded-lg"
                onClick={() => setIsCreatingSchool(false)}
              >
                {t('common.cancel')}
              </button>
              <button
                className="px-4 py-2 bg-animik-dark text-white rounded-lg"
                onClick={handleCreateSchool}
              >
                {t('common.save')}
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddingUser && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm grid place-items-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg space-y-4">
            <h3 className="text-xl font-semibold text-animik-dark">{t('admin.licenses.addUser')}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('admin.licenses.assignedAgent')}</label>
                <input
                  value={newUserAgent}
                  onChange={(event) => setNewUserAgent(event.target.value)}
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="agent@animikind.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t('admin.licenses.defaultGrade')}</label>
                <input
                  value={newUserGrade}
                  onChange={(event) => setNewUserGrade(event.target.value)}
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="K-12"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 border border-gray-200 rounded-lg"
                onClick={() => setIsAddingUser(false)}
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

export default SchoolManagementPage;
