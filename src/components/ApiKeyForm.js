import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaKey, FaEye, FaEyeSlash } from 'react-icons/fa';

const scanAnimation = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 10px rgba(0, 255, 255, 0.3); }
  50% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.5), 0 0 30px rgba(0, 255, 255, 0.2); }
  100% { box-shadow: 0 0 10px rgba(0, 255, 255, 0.3); }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 80px);
  padding: 2rem;
  position: relative;
  z-index: 5;
`;

const FormCard = styled.div`
  background-color: rgba(0, 8, 20, 0.7);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 4px;
  padding: 2.5rem;
  width: 100%;
  max-width: 500px;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
  animation: ${pulse} 4s infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, ${props => props.theme.secondary}, transparent);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      transparent,
      rgba(0, 255, 255, 0.03) 50%,
      transparent
    );
    animation: ${scanAnimation} 3s linear infinite;
    pointer-events: none;
  }
`;

const Title = styled.h2`
  color: ${props => props.theme.secondary};
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 500;
  text-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
`;

const Description = styled.p`
  margin-bottom: 2rem;
  line-height: 1.6;
  color: ${props => props.theme.text};
  opacity: 0.9;
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.3);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid ${props => props.theme.border};
  border-radius: 4px;
  font-size: 1rem;
  background-color: rgba(0, 18, 51, 0.5);
  color: ${props => props.theme.text};
  transition: all 0.3s ease;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 1px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.secondary};
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.secondary};
  filter: drop-shadow(0 0 3px rgba(0, 255, 255, 0.5));
`;

const ToggleVisibility = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${props => props.theme.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
    filter: drop-shadow(0 0 3px rgba(0, 255, 255, 0.7));
  }
`;

const SubmitButton = styled.button`
  background-color: transparent;
  color: ${props => props.theme.secondary};
  border: 1px solid ${props => props.theme.secondary};
  border-radius: 4px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 1px;
  text-transform: uppercase;
  
  &:hover {
    background-color: rgba(0, 255, 255, 0.1);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
  }
  
  &:disabled {
    background-color: transparent;
    border-color: ${props => props.theme.border};
    color: ${props => props.theme.border};
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.danger};
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: left;
  text-shadow: 0 0 5px rgba(255, 49, 49, 0.3);
`;

const ApiKeyForm = ({ onSubmit }) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      setError('API Key is required');
      return;
    }
    
    // Simple validation - API key should be at least 10 characters
    if (apiKey.length < 10) {
      setError('API Key should be at least 10 characters long');
      return;
    }
    
    setError('');
    onSubmit(apiKey);
  };
  
  return (
    <FormContainer>
      <FormCard>
        <Title>A.V.I.S</Title>
        <Description>
          To access the AI interface, please enter your authentication key.
        </Description>
        
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <InputIcon>
              <FaKey />
            </InputIcon>
            <Input 
              type={showApiKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your access key"
            />
            <ToggleVisibility 
              type="button" 
              onClick={() => setShowApiKey(!showApiKey)}
              aria-label={showApiKey ? 'Hide access key' : 'Show access key'}
            >
              {showApiKey ? <FaEyeSlash /> : <FaEye />}
            </ToggleVisibility>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </InputGroup>
          
          <SubmitButton type="submit" disabled={!apiKey.trim()}>
            <FaKey /> Initialize System
          </SubmitButton>
        </Form>
      </FormCard>
    </FormContainer>
  );
};

export default ApiKeyForm;