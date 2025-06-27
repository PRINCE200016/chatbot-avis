import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  background: '#f5f5f5',
  text: '#333333',
  primary: '#0066cc',
  secondary: '#003366',
  accent: '#00aaff',
  cardBackground: '#ffffff',
  inputBackground: '#ffffff',
  border: '#e0e0e0',
  shadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  userMessage: '#e1f5fe',
  botMessage: '#f1f1f1',
  buttonBackground: '#0066cc',
  buttonText: '#ffffff',
  headerBackground: '#0066cc',
  headerText: '#ffffff',
  success: '#28a745',
  warning: '#ffc107',
  danger: '#dc3545',
  info: '#17a2b8'
};

export const darkTheme = {
  background: '#000814',
  text: '#00FFFF', // Neon cyan text
  primary: '#39FF14', // Neon green
  secondary: '#00FFFF', // Neon cyan
  accent: '#FF10F0', // Neon magenta
  cardBackground: 'rgba(4, 12, 24, 0.7)',
  inputBackground: 'rgba(0, 18, 51, 0.5)',
  border: '#003366',
  shadow: '0 0 15px rgba(0, 255, 255, 0.3)',
  userMessage: 'rgba(0, 51, 102, 0.7)',
  botMessage: 'rgba(0, 18, 51, 0.7)',
  buttonBackground: 'rgba(57, 255, 20, 0.8)',
  buttonText: '#000814',
  headerBackground: 'transparent',
  headerText: '#00FFFF',
  success: '#39FF14',
  warning: '#FFFF00',
  danger: '#FF3131',
  info: '#00FFFF',
  glowEffect: '0 0 10px rgba(0, 255, 255, 0.7), 0 0 20px rgba(0, 255, 255, 0.5), 0 0 30px rgba(0, 255, 255, 0.3)',
};

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    transition: all 0.3s ease;
    font-family: 'Orbitron', sans-serif;
  }

  a {
    color: ${props => props.theme.primary};
    text-decoration: none;
    text-shadow: ${props => props.theme.glowEffect};
  }

  button {
    background-color: ${props => props.theme.buttonBackground};
    color: ${props => props.theme.buttonText};
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Orbitron', sans-serif;
    letter-spacing: 1px;
    text-transform: uppercase;
    box-shadow: 0 0 10px rgba(57, 255, 20, 0.5);

    &:hover {
      opacity: 0.9;
      box-shadow: 0 0 15px rgba(57, 255, 20, 0.8);
    }

    &:disabled {
      background-color: ${props => props.theme.border};
      cursor: not-allowed;
      box-shadow: none;
    }
  }

  input, textarea {
    background-color: ${props => props.theme.inputBackground};
    color: ${props => props.theme.text};
    border: 1px solid ${props => props.theme.border};
    border-radius: 4px;
    padding: 8px 12px;
    transition: all 0.3s ease;
    font-family: 'Orbitron', sans-serif;

    &:focus {
      outline: none;
      border-color: ${props => props.theme.primary};
      box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
    }
  }

  .ai-face {
    animation: blinkEffect 6s infinite;
  }

  @keyframes blinkEffect {
    0%, 95%, 98% {
      opacity: 1;
    }
    96%, 97% {
      opacity: 0.4;
    }
  }
`;