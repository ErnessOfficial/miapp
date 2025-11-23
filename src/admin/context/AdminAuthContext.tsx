import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as adminClient from '../api/adminClient';
import { AdminUser } from '../types';

interface AdminAuthContextValue {
  admin: AdminUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

const SESSION_KEY = 'adminSession';

interface AdminSessionSnapshot {
  token: string;
  admin: AdminUser;
}

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const snapshot = sessionStorage.getItem(SESSION_KEY);
      if (snapshot) {
        const parsed: AdminSessionSnapshot = JSON.parse(snapshot);
        setAdmin(parsed.admin);
        setToken(parsed.token);
      }
    } catch (err) {
      console.error('Failed to parse persisted admin session', err);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { token: authToken, admin: adminUser } = await adminClient.login(email, password);
      setAdmin(adminUser);
      setToken(authToken);
      const snapshot: AdminSessionSnapshot = { token: authToken, admin: adminUser };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(snapshot));
    } catch (err) {
      console.error('Admin login failed', err);
      setError(err instanceof Error ? err.message : 'Unexpected error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setAdmin(null);
    setToken(null);
    sessionStorage.removeItem(SESSION_KEY);
  }, []);

  const value = useMemo(
    () => ({
      admin,
      token,
      loading,
      error,
      login,
      logout,
      isAuthenticated: Boolean(admin && token),
    }),
    [admin, error, loading, login, logout, token]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = (): AdminAuthContextValue => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
