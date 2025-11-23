import i18n from './i18n';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import App from './src/App';
import { UserProvider } from './context/UserContext';
import { AdminAuthProvider } from './src/admin/context/AdminAuthContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <HashRouter>
        <AdminAuthProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </AdminAuthProvider>
      </HashRouter>
    </I18nextProvider>
  </React.StrictMode>
);
