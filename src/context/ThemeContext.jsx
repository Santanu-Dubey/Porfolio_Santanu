import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  theme: 'ink',
  toggleTheme: () => {},
  isIndigoGreen: false,
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('santanu_theme') || 'ink';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('santanu_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'ink' ? 'indigo-green' : 'ink'));
  };

  const isIndigoGreen = theme === 'indigo-green';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isIndigoGreen }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
