import { useState, useEffect } from 'react';
import config from '../config';

/**
 * Custom hook for managing theme
 * @returns {Object} - Theme state and functions
 */
const useTheme = () => {
  // Check if there's a saved theme in localStorage, otherwise use default
  const getSavedTheme = () => {
    const savedTheme = localStorage.getItem('avis_theme');
    return savedTheme || config.ui.defaultTheme;
  };
  
  const [theme, setTheme] = useState(getSavedTheme);
  
  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem('avis_theme', theme);
    
    // Update body class for global styling if needed
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
  }, [theme]);
  
  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  // Set a specific theme
  const setSpecificTheme = (newTheme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      setTheme(newTheme);
    }
  };
  
  return {
    theme,
    toggleTheme,
    setTheme: setSpecificTheme,
    isDarkTheme: theme === 'dark'
  };
};

export default useTheme;