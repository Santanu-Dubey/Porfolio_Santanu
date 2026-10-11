import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/fraunces/400.css';
import '@fontsource/fraunces/600.css';
import '@fontsource/fraunces/700.css';
import './styles/index.css';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext';
import { MotionProvider } from './context/MotionContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <MotionProvider>
        <App />
      </MotionProvider>
    </ThemeProvider>
  </StrictMode>
);
