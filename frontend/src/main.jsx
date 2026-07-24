import { createRoot } from 'react-dom/client';
import './style.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { getStoredTheme, setHtmlTheme } from './utils/theme.js';

setHtmlTheme(getStoredTheme());

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
);
