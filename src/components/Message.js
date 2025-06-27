import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaRobot, FaUser } from 'react-icons/fa';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: flex-start;
  animation: ${fadeInUp} 0.5s ease-out forwards;
`;

const IconGlow = keyframes`
  0% {
    filter: drop-shadow(0 0 3px ${props => props.$sender === 'user' ? 'rgba(57, 255, 20, 0.5)' : 'rgba(0, 255, 255, 0.5)'});
  }
  50% {
    filter: drop-shadow(0 0 8px ${props => props.$sender === 'user' ? 'rgba(57, 255, 20, 0.8)' : 'rgba(0, 255, 255, 0.8)'});
  }
  100% {
    filter: drop-shadow(0 0 3px ${props => props.$sender === 'user' ? 'rgba(57, 255, 20, 0.5)' : 'rgba(0, 255, 255, 0.5)'});
  }
`;

const IconContainer = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: ${props => props.$sender === 'user' ? props.theme.primary : props.theme.secondary};
  flex-shrink: 0;
  font-size: 1.2rem;
  filter: drop-shadow(0 0 5px ${props => props.$sender === 'user' ? 'rgba(57, 255, 20, 0.7)' : 'rgba(0, 255, 255, 0.7)'});
  animation: ${IconGlow} 3s infinite;
`;

const MessageContent = styled.div`
  background-color: transparent;
  padding: 1rem;
  border-radius: 0;
  max-width: 85%;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: ${props => props.$sender === 'user' ? '80%' : '60%'};
    height: 1px;
    background: linear-gradient(
      90deg,
      ${props => props.$sender === 'user' ? props.theme.primary : props.theme.secondary} 0%,
      transparent 100%
    );
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    ${props => props.$sender === 'user' ? 'right: 0;' : 'left: 0;'}
    width: ${props => props.$sender === 'user' ? '60%' : '80%'};
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${props => props.$sender === 'user' ? props.theme.primary : props.theme.secondary} 100%
    );
    ${props => props.$sender === 'user' ? 'transform: scaleX(-1);' : ''}
  }
`;

const MessageText = styled.div`
  color: ${props => props.$isError ? props.theme.danger : props.$sender === 'user' ? props.theme.primary : props.theme.secondary};
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
  text-shadow: 0 0 10px ${props => props.$isError ? 'rgba(255, 49, 49, 0.5)' : props.$sender === 'user' ? 'rgba(57, 255, 20, 0.5)' : 'rgba(0, 255, 255, 0.5)'};
  position: relative;
  z-index: 2;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 1px;
  
  code {
    background-color: rgba(0, 8, 20, 0.6);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    border: 1px solid ${props => props.$sender === 'user' ? 'rgba(57, 255, 20, 0.3)' : 'rgba(0, 255, 255, 0.3)'};
  }
  
  pre {
    background-color: rgba(0, 8, 20, 0.6);
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
    margin: 0.5rem 0;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    border: 1px solid ${props => props.$sender === 'user' ? 'rgba(57, 255, 20, 0.3)' : 'rgba(0, 255, 255, 0.3)'};
  }
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: ${props => props.$sender === 'user' ? 'flex-end' : 'flex-start'};
  max-width: 90%;
  position: relative;
  overflow: visible;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      ${props => props.$sender === 'user' ? 'rgba(57, 255, 20, 0.02)' : 'rgba(0, 255, 255, 0.02)'} 0%,
      ${props => props.$sender === 'user' ? 'rgba(57, 255, 20, 0.08)' : 'rgba(0, 255, 255, 0.08)'} 50%,
      ${props => props.$sender === 'user' ? 'rgba(57, 255, 20, 0.02)' : 'rgba(0, 255, 255, 0.02)'} 100%
    );
    background-size: 200% 100%;
    animation: ${shimmer} 3s infinite;
    z-index: 0;
    border-radius: 8px;
  }
`;

const MessageTime = styled.div`
  font-size: 0.7rem;
  color: ${props => props.$sender === 'user' ? props.theme.primary : props.theme.secondary};
  opacity: 0.7;
  margin-top: 0.25rem;
  margin-left: ${props => props.$sender === 'user' ? 'auto' : '0.5rem'};
  margin-right: ${props => props.$sender === 'user' ? '0.5rem' : '0'};
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 1px;
  text-shadow: 0 0 5px ${props => props.$sender === 'user' ? 'rgba(57, 255, 20, 0.3)' : 'rgba(0, 255, 255, 0.3)'};
`;

const formatMessageText = (text) => {
  // Replace markdown code blocks with HTML
  const formattedText = text
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
  
  return formattedText;
};

const Message = ({ text, sender, isError = false, icon }) => {
  const formattedText = formatMessageText(text);
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  return (
    <MessageWrapper $sender={sender}>
      <MessageContainer>
        {sender === 'bot' && (
          <IconContainer $sender={sender}>
            {icon || <FaRobot />}
          </IconContainer>
        )}
        <MessageContent $sender={sender} $isError={isError}>
          <MessageText 
            $sender={sender}
            $isError={isError}
            dangerouslySetInnerHTML={{ __html: formattedText }}
          />
        </MessageContent>
        {sender === 'user' && (
          <IconContainer $sender={sender}>
            {icon || <FaUser />}
          </IconContainer>
        )}
      </MessageContainer>
      <MessageTime $sender={sender}>{timestamp}</MessageTime>
    </MessageWrapper>
  );
};

export default Message;