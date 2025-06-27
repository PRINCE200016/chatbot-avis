import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaPaperPlane, FaRobot, FaUser, FaMicrophone, FaStop } from 'react-icons/fa';
import axios from 'axios';
import ApiKeyForm from './ApiKeyForm';
import Message from './Message';
import Typing from './Typing';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 1rem;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: ${props => props.theme.cardBackground};
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadow};
  margin-bottom: 1rem;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.background};
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.border};
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.primary};
  }
`;

const InputContainer = styled.form`
  display: flex;
  gap: 0.5rem;
  background-color: ${props => props.theme.cardBackground};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadow};
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  font-size: 1rem;
  background-color: ${props => props.theme.inputBackground};
  color: ${props => props.theme.text};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.primary}33;
  }
`;

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.secondary};
  }
  
  &:disabled {
    background-color: ${props => props.theme.border};
    cursor: not-allowed;
  }
`;

const VoiceButton = styled(SendButton)`
  background-color: ${props => props.isListening ? props.theme.danger : props.theme.accent};
  
  &:hover {
    background-color: ${props => props.isListening ? props.theme.danger : props.theme.secondary};
  }
`;

const WelcomeMessage = styled.div`
  text-align: center;
  margin: 2rem 0;
  padding: 2rem;
  background-color: ${props => props.theme.cardBackground};
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadow};
  
  h2 {
    color: ${props => props.theme.primary};
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
`;

const ChatInterface = ({ apiKey, isAuthenticated, onApiKeySubmit }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Speech recognition setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  
  if (recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      
      setInput(transcript);
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };
  }
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const toggleListening = () => {
    if (!recognition) return;
    
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    
    setIsListening(!isListening);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    // Add user message
    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Call the API without sending the API key in the header
      // The backend will use its own API key from environment variables
      const response = await axios.post('http://localhost:8080/api/chat', {
        message: input
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Add bot response
      const botMessage = { id: Date.now() + 1, text: response.data.response, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      const errorMessage = { 
        id: Date.now() + 1, 
        text: error.response?.data?.error || 'An error occurred while processing your request.', 
        sender: 'bot', 
        isError: true 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Skip the API key form since we're using the backend API key
  if (!isAuthenticated) {
    return <ApiKeyForm onSubmit={onApiKeySubmit} />;
  }
  
  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.length === 0 ? (
          <WelcomeMessage>
            <h2>Welcome to A.V.I.S</h2>
            <p>I'm your AI assistant. How can I help you today?</p>
            <p>You can ask me questions, request information, or just chat!</p>
          </WelcomeMessage>
        ) : (
          messages.map(message => (
            <Message 
              key={message.id} 
              text={message.text} 
              sender={message.sender} 
              isError={message.isError}
              icon={message.sender === 'user' ? <FaUser /> : <FaRobot />}
            />
          ))
        )}
        {isLoading && <Typing />}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      
      <InputContainer onSubmit={handleSubmit}>
        <MessageInput 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Type your message here..." 
          disabled={isLoading}
        />
        {recognition && (
          <VoiceButton 
            type="button" 
            onClick={toggleListening} 
            isListening={isListening}
            disabled={isLoading}
            aria-label={isListening ? 'Stop listening' : 'Start voice input'}
          >
            {isListening ? <FaStop /> : <FaMicrophone />}
          </VoiceButton>
        )}
        <SendButton type="submit" disabled={!input.trim() || isLoading}>
          <FaPaperPlane />
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatInterface;