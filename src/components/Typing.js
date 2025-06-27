import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaRobot } from 'react-icons/fa';

const pulse = keyframes`
  0% { transform: scale(0.8); opacity: 0.5; filter: blur(1px); }
  50% { transform: scale(1.2); opacity: 1; filter: blur(0px); box-shadow: 0 0 20px #00FFFF, 0 0 30px #00FFFF; }
  100% { transform: scale(0.8); opacity: 0.5; filter: blur(1px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const iconGlow = keyframes`
  0% { filter: drop-shadow(0 0 3px rgba(0, 255, 255, 0.5)); }
  50% { filter: drop-shadow(0 0 8px rgba(0, 255, 255, 0.8)); }
  100% { filter: drop-shadow(0 0 3px rgba(0, 255, 255, 0.5)); }
`;

const TypingContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: flex-start;
  animation: ${fadeIn} 0.3s ease;
`;

const IconContainer = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: ${props => props.theme.secondary};
  flex-shrink: 0;
  font-size: 1.2rem;
  filter: drop-shadow(0 0 5px rgba(0, 255, 255, 0.7));
  animation: ${iconGlow} 3s infinite;
`;

const TypingContent = styled.div`
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
    width: 60%;
    height: 1px;
    background: linear-gradient(
      90deg,
      ${props => props.theme.secondary} 0%,
      transparent 100%
    );
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${props => props.theme.secondary} 60%,
      transparent 100%
    );
  }
`;

const TypingDots = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-bottom: 6px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.theme.secondary};
  animation: ${pulse} 1.5s infinite ease-in-out;
  animation-delay: ${props => props.$delay};
  position: relative;
  filter: drop-shadow(0 0 5px rgba(0, 255, 255, 0.5));
  
  &::after {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: 50%;
    background: transparent;
    border: 1px solid ${props => props.theme.secondary};
    opacity: 0.5;
    animation: ${pulse} 1.5s infinite ease-in-out;
    animation-delay: ${props => props.$delay};
  }
`;

const ThinkingLine = styled.div`
  height: 1px;
  width: 100px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${props => props.theme.secondary} 50%,
    transparent 100%
  );
  margin-top: 8px;
  animation: ${fadeIn} 1s infinite alternate;
  box-shadow: 0 0 8px rgba(0, 255, 255, 0.5);
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const TypingWrapper = styled.div`
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
      rgba(0, 255, 255, 0.02) 0%,
      rgba(0, 255, 255, 0.08) 50%,
      rgba(0, 255, 255, 0.02) 100%
    );
    background-size: 200% 100%;
    animation: ${shimmer} 3s infinite;
    z-index: 0;
    border-radius: 8px;
  }
`;

const Typing = () => {
  return (
    <TypingWrapper>
    <TypingContainer>
      <IconContainer>
        <FaRobot />
      </IconContainer>
      <TypingContent>
        <TypingDots>
          <Dot $delay="0s" />
            <Dot $delay="0.3s" />
            <Dot $delay="0.6s" />
        </TypingDots>
          <ThinkingLine />
      </TypingContent>
    </TypingContainer>
    </TypingWrapper>
  );
};

export default Typing;