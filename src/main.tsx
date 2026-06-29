import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import PrivacyPage from './components/PrivacyPage.tsx';
import './index.css';

const isPrivacyPage = window.location.pathname === '/privacidade';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isPrivacyPage ? <PrivacyPage /> : <App />}
  </StrictMode>,
);
