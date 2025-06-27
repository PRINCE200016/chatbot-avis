import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% {
    opacity: 0.7;
    stroke-width: 0.5;
  }
  50% {
    opacity: 1;
    stroke-width: 1;
  }
`;

const rotate = keyframes`
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
`;

const WireframeContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  pointer-events: none;
  perspective: 1000px;
  
  svg {
    width: 100%;
    height: 100%;
    stroke: ${props => props.theme.secondary};
    stroke-width: 0.5;
    fill: none;
    opacity: 0.5;
    mix-blend-mode: screen;
    animation: ${pulse} 4s infinite ease-in-out;
    filter: drop-shadow(0 0 5px rgba(0, 255, 255, 0.5));
  }
`;

const RotatingWireframe = styled.div`
  position: absolute;
  width: 110%;
  height: 110%;
  animation: ${rotate} 20s infinite linear;
  transform-style: preserve-3d;
  opacity: 0.2;
`;

const WireframeOverlay = () => {
  return (
    <WireframeContainer>
      {/* Main face wireframe */}
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        {/* Face outline */}
        <path d="M30,30 Q50,20 70,30 Q85,45 70,70 Q50,85 30,70 Q15,45 30,30 Z" />
        
        {/* Eyes */}
        <ellipse cx="35" cy="45" rx="5" ry="3" />
        <ellipse cx="65" cy="45" rx="5" ry="3" />
        
        {/* Nose */}
        <path d="M50,45 L50,60 M45,60 L55,60" />
        
        {/* Mouth */}
        <path d="M40,70 Q50,75 60,70" />
        
        {/* Forehead lines */}
        <path d="M35,30 L40,25 M50,20 L50,25 M65,30 L60,25" />
        
        {/* Cheek lines */}
        <path d="M25,50 L30,50 M70,50 L75,50" />
        
        {/* Jaw lines */}
        <path d="M30,70 L25,65 M70,70 L75,65" />
        
        {/* Data points */}
        <circle cx="30" cy="30" r="1" />
        <circle cx="70" cy="30" r="1" />
        <circle cx="30" cy="70" r="1" />
        <circle cx="70" cy="70" r="1" />
        <circle cx="50" cy="25" r="1" />
        <circle cx="50" cy="75" r="1" />
        <circle cx="25" cy="50" r="1" />
        <circle cx="75" cy="50" r="1" />
      </svg>
      
      {/* Rotating wireframe sphere */}
      <RotatingWireframe>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" />
          <ellipse cx="50" cy="50" rx="45" ry="20" />
          <ellipse cx="50" cy="50" rx="45" ry="20" transform="rotate(30 50 50)" />
          <ellipse cx="50" cy="50" rx="45" ry="20" transform="rotate(60 50 50)" />
          <ellipse cx="50" cy="50" rx="45" ry="20" transform="rotate(90 50 50)" />
          <line x1="5" y1="50" x2="95" y2="50" />
          <line x1="50" y1="5" x2="50" y2="95" />
        </svg>
      </RotatingWireframe>
      
      {/* Digital data points */}
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        {Array.from({ length: 20 }).map((_, i) => (
          <circle 
            key={i}
            cx={Math.random() * 100} 
            cy={Math.random() * 100} 
            r="0.5"
          />
        ))}
      </svg>
    </WireframeContainer>
  );
};

export default WireframeOverlay; 