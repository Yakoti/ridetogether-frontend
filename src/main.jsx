

import './index.css';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import AuthProvider from './context/AuthContext.jsx';
import App from './App';
import { BrowserRouter } from 'react-router-dom';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
