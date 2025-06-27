import React, { createContext, useContext, useState, useEffect } from 'react';
import useTheme from '../hooks/useTheme';

// Create context
const AppContext = createContext();

/**
 * AppProvider component for managing global application state
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const AppProvider = ({ children }) => {
  // Authentication state
  const [apiKey, setApiKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true by default
  
  // Theme state
  const themeState = useTheme();
  
  // Use the backend API key directly instead of requiring user input
  useEffect(() => {
    // Set a placeholder API key - the actual key is stored in the backend
    setApiKey('backend-managed-key');
  }, []);
  
  // Handle API key submission - this is now just a fallback
  const handleApiKeySubmit = (key) => {
    setApiKey(key);
    localStorage.setItem('avis_api_key', key);
    setIsAuthenticated(true);
  };
  
  // Handle logout
  const handleLogout = () => {
    setApiKey('');
    localStorage.removeItem('avis_api_key');
    setIsAuthenticated(false);
  };
  
  // Context value
  const contextValue = {
    // Authentication
    apiKey,
    isAuthenticated,
    onApiKeySubmit: handleApiKeySubmit,
    onLogout: handleLogout,
    
    // Theme
    theme: themeState.theme,
    toggleTheme: themeState.toggleTheme,
    setTheme: themeState.setTheme,
    isDarkTheme: themeState.isDarkTheme
  };
  
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * Custom hook for accessing the AppContext
 * @returns {Object} - The AppContext value
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;