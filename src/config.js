/**
 * Configuration settings for the A.V.I.S application
 */

const config = {
  // API configuration
  api: {
    baseUrl: 'http://localhost:8080/api',
    endpoints: {
      chat: '/chat',
      test: '/test'
    },
    timeout: 30000 // 30 seconds
  },
  
  // UI configuration
  ui: {
    defaultTheme: 'light',
    messageLimit: 100, // Maximum number of messages to store in state
    typingIndicatorDelay: 500 // Milliseconds to show typing indicator
  },
  
  // Feature flags
  features: {
    voiceInput: true,
    markdownSupport: true,
    codeHighlighting: true,
    themeSwitching: true
  }
};

export default config;