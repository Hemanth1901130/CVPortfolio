import { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

const themes = {
  blue: {
    primary: '#00415fff',
    secondary: '#6366f1',
    dark: '#0f172a',
    light: '#f8fafc'
  },
  green: {
    primary: '#10b981',
    secondary: '#059669',
    dark: '#064e3b',
    light: '#f0fdf4'
  },
  purple: {
    primary: '#8b5cf6',
    secondary: '#7c3aed',
    dark: '#2e1065',
    light: '#f5f3ff'
  },
  orange: {
    primary: '#f97316',
    secondary: '#ea580c',
    dark: '#7c2d12',
    light: '#fff7ed'
  },
  pink: {
    primary: '#ec4899',
    secondary: '#db2777',
    dark: '#831843',
    light: '#fdf2f8'
  }
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('blue');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-color') || 'blue';
    const savedMode = localStorage.getItem('theme-mode') === 'dark';
    
    // Make sure the theme exists in our themes object
    const themeToUse = themes[savedTheme] ? savedTheme : 'blue';
    
    setCurrentTheme(themeToUse);
    setIsDarkMode(savedMode);
    
    if (savedMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    applyThemeColors(themeToUse);
  }, []);

  const applyThemeColors = (themeName) => {
    // Default to blue theme if the requested theme doesn't exist
    const theme = themes[themeName] || themes.blue;
    
    document.documentElement.style.setProperty('--color-primary', theme.primary);
    document.documentElement.style.setProperty('--color-secondary', theme.secondary);
    document.documentElement.style.setProperty('--color-dark', theme.dark);
    document.documentElement.style.setProperty('--color-light', theme.light);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme-mode', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme-mode', 'light');
    }
  };

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
      localStorage.setItem('theme-color', themeName);
      applyThemeColors(themeName);
    }
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        currentTheme, 
        isDarkMode, 
        themes, 
        toggleDarkMode, 
        changeTheme 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;