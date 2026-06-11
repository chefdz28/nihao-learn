import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { I18nProvider } from './i18n';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';
import App from './App.tsx';

// Handle SPA redirect from 404.html fallback
const redirect = sessionStorage.getItem('redirect');
if (redirect) {
  sessionStorage.removeItem('redirect');
  if (redirect !== '/') {
    window.history.replaceState(null, '', redirect);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </I18nProvider>
    </BrowserRouter>
  </StrictMode>,
);
