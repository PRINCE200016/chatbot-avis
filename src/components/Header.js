import React from 'react';
import styled from 'styled-components';
import { FaSignOutAlt } from 'react-icons/fa';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: transparent;
  color: ${props => props.theme.headerText};
  position: relative;
  z-index: 10;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 10%;
    right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${props => props.theme.secondary}, transparent);
    opacity: 0.5;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const LogoImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(0, 18, 51, 0.8));
  border: 1px solid rgba(0, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
  color: ${props => props.theme.secondary};
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.7);
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      transparent,
      rgba(0, 255, 255, 0.1),
      transparent
    );
    transform: rotate(45deg);
    animation: scanEffect 3s linear infinite;
  }
  
  @keyframes scanEffect {
    0% {
      transform: translateY(-100%) rotate(45deg);
    }
    100% {
      transform: translateY(100%) rotate(45deg);
    }
  }
`;

const LogoText = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${props => props.theme.secondary};
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  
  span {
    font-weight: 300;
    opacity: 0.8;
    font-size: 1rem;
    letter-spacing: 1px;
    margin-left: 5px;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoutButton = styled.button`
  background: transparent;
  border: 1px solid ${props => props.theme.secondary};
  color: ${props => props.theme.secondary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 1px;
  font-size: 0.8rem;
  
  &:hover {
    background-color: rgba(0, 255, 255, 0.1);
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  }
`;

const Header = ({ isAuthenticated, onLogout }) => {
  return (
    <HeaderContainer>
      <Logo>
        <LogoImage>A</LogoImage>
        <LogoText>
          A.V.I.S <span>Assistant</span>
        </LogoText>
      </Logo>
      <Controls>
        {isAuthenticated && (
          <LogoutButton onClick={onLogout}>
            <FaSignOutAlt /> Logout
          </LogoutButton>
        )}
      </Controls>
    </HeaderContainer>
  );
};

export default Header;