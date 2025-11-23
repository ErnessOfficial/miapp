import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Location } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LockKeyhole } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminLoginPage: React.FC = () => {
  const { login, loading, error } = useAdminAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(null);
    if (!email || !password) {
      setFormError(t('admin.login.requiredFields'));
      return;
    }

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setFormError(error || t('admin.login.failed'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-animik-dark via-gray-800 to-animik-gray flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-animik-yellow text-animik-dark">
            <LockKeyhole className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('admin.login.subtitle')}</p>
            <h1 className="text-2xl font-bold text-animik-dark">{t('admin.login.title')}</h1>
          </div>
        </div>

        {(formError || error) && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {formError || error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t('admin.login.email')}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-animik-yellow"
              placeholder="admin@animikind.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              {t('admin.login.password')}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-animik-yellow"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-animik-dark text-white font-semibold rounded-lg hover:bg-animik-dark/90 transition-colors disabled:opacity-60"
          >
            {loading ? t('admin.login.loading') : t('admin.login.submit')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
