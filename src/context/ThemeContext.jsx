import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('azul');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('cps-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cps-theme', theme);
  }, [theme]);

  const changeTheme = (newTheme) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setTheme(newTheme);
      setTimeout(() => setIsTransitioning(false), 300);
    }, 150);
  };

  const getThemeColors = () => {
    switch (theme) {
      case 'azul':
        return { primary: '#3b82f6', secondary: '#60a5fa', glow: 'rgba(59, 130, 246, 0.5)', name: 'Desenvolvedor', bg: '#0a0a0f', text: '#ffffff', textSecondary: '#a0a0b0' };
      case 'roxo':
        return { primary: '#a855f7', secondary: '#c084fc', glow: 'rgba(168, 85, 247, 0.5)', name: 'Criativo', bg: '#0a0a0f', text: '#ffffff', textSecondary: '#a0a0b0' };
      case 'vermelho':
        return { primary: '#ef4444', secondary: '#f87171', glow: 'rgba(239, 68, 68, 0.5)', name: 'Hacker', bg: '#0a0a0f', text: '#ffffff', textSecondary: '#a0a0b0' };
      case 'verde':
        return { primary: '#22c55e', secondary: '#4ade80', glow: 'rgba(34, 197, 94, 0.5)', name: 'Natureza', bg: '#0a0a0f', text: '#ffffff', textSecondary: '#a0a0b0' };
      case 'laranja':
        return { primary: '#f97316', secondary: '#fb923c', glow: 'rgba(249, 115, 22, 0.5)', name: 'Energia', bg: '#0a0a0f', text: '#ffffff', textSecondary: '#a0a0b0' };
      default:
        return { primary: '#3b82f6', secondary: '#60a5fa', glow: 'rgba(59, 130, 246, 0.5)', name: 'Desenvolvedor', bg: '#0a0a0f', text: '#ffffff', textSecondary: '#a0a0b0' };
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, isTransitioning, getThemeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};
