import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RegistrationPage from './pages/RegistrationPage';
import DashboardPage from './pages/DashboardPage';
import ChatPage from './pages/ChatPage';
import AppLayout from './layouts/AppLayout';
import AuthLayout from './layouts/AuthLayout';
import DiagnosticTestPage from './pages/DiagnosticTestPage';
import MyActionsPage from './pages/MyActionsPage';
import EmotionalJournalPage from './pages/EmotionalJournalPage';
import PostPlanTestPage from './pages/PostPlanTestPage';
import NewPlanSummaryPage from './pages/NewPlanSummaryPage';
import WisdomDropsPage from './pages/WisdomDropsPage';
import AdminGuard from './admin/components/AdminGuard';
import AdminLayout from './admin/layouts/AdminLayout';
import AdminLoginPage from './admin/pages/AdminLoginPage';
import AdminDashboardPage from './admin/pages/AdminDashboardPage';
import SchoolManagementPage from './admin/pages/SchoolManagementPage';
import LicenseManagementPage from './admin/pages/LicenseManagementPage';
import AdminLogsPage from './admin/pages/AdminLogsPage';

function App(): React.ReactNode {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <Routes>
      {/* Public routes */}
      <Route element={<AuthLayout />}> 
        <Route path="/" element={<RegistrationPage />} />
      </Route>

      {/* Private routes */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/my-actions" element={<MyActionsPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/diagnostic-test" element={<DiagnosticTestPage />} />
        <Route path="/post-plan-test" element={<PostPlanTestPage />} />
        <Route path="/new-plan-summary" element={<NewPlanSummaryPage />} />
        <Route path="/journal" element={<EmotionalJournalPage />} />
        <Route path="/wisdom-drops" element={<WisdomDropsPage />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route element={<AdminGuard />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/schools" element={<SchoolManagementPage />} />
          <Route path="/admin/licenses" element={<LicenseManagementPage />} />
          <Route path="/admin/logs" element={<AdminLogsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
