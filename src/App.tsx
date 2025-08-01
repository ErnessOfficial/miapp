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
    </Routes>
  );
}

export default App;
