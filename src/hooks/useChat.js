import { useState, useCallback, useEffect } from 'react';
import api from '../services/api';
import config from '../config';
import { generateId } from '../utils/helpers';

/**
 * Custom hook for managing chat functionality
 * @returns {Object} - Chat state and functions
 */
const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Add a welcome message when the chat is initialized
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: generateId(),
          text: 'Hello! I\'m A.V.I.S, your AI assistant. How can I help you today?',
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }
  }, [messages.length]);
  
  // Function to send a message to the API
  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return;
    
    // Add user message to the chat
    const userMessage = {
      id: generateId(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    
    try {
      // Call the API
      const response = await api.sendMessage(text);
      
      // Add bot response to the chat
      const botMessage = {
        id: generateId(),
        text: response.response,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => {
        // Limit the number of messages to prevent performance issues
        const updatedMessages = [...prev, botMessage];
        if (updatedMessages.length > config.ui.messageLimit) {
          return updatedMessages.slice(-config.ui.messageLimit);
        }
        return updatedMessages;
      });
    } catch (err) {
      console.error('Error sending message:', err);
      
      // Add error message
      const errorMessage = {
        id: generateId(),
        text: err.response?.data?.error || 'An error occurred while processing your request.',
        sender: 'bot',
        isError: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setError(err.response?.data?.error || 'An error occurred while processing your request.');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Function to clear the chat history
  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);
  
  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat
  };
};

export default useChat;