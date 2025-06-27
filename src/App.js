import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';
import { lightTheme, darkTheme, GlobalStyles } from './themes';
import { AppProvider, useAppContext } from './context/AppContext';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  transition: all 0.3s ease;
`;

function AppContent() {
  const { 
    theme, 
    isAuthenticated, 
    onLogout, 
    toggleTheme 
  } = useAppContext();

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <AppContainer>
        <Header 
          theme={theme} 
          toggleTheme={toggleTheme} 
          isAuthenticated={isAuthenticated}
          onLogout={onLogout}
        />
        <ChatInterface 
          isAuthenticated={isAuthenticated} 
          onApiKeySubmit={onLogout} 
        />
      </AppContainer>
    </ThemeProvider>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;