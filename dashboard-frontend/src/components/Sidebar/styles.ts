import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.aside`
  width: 240px;
  height: 100vh;
  background-color: #1a2233;
  padding: 2rem 1rem;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
`;

export const Logo = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

interface NavItemProps {
  $active?: boolean;
}

export const NavItem = styled(Link)<NavItemProps>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${props => props.$active ? '#fff' : '#8895ab'};
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: ${props => props.$active ? '#2d3748' : 'transparent'};
  transition: all 0.2s;

  &:hover {
    background-color: #2d3748;
    color: #fff;
  }
`;

export const UserSection = styled.div`
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .user-info {
    display: flex;
    flex-direction: column;
    
    .name {
      color: white;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .email {
      color: #8895ab;
      font-size: 0.75rem;
    }
  }
`;

export const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #8895ab;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.2s;

  &:hover {
    background-color: #2d3748;
    color: #fff;
  }
`;