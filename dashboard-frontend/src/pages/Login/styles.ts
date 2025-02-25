import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f6fa;
  background-image: linear-gradient(135deg, #1a2233 0%, #2d3748 100%);
`;

export const LoginCard = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-width: 400px;
  text-align: center;

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    color: #1a2233;

    h1 {
      font-size: 1.75rem;
      font-weight: bold;
    }
  }

  p {
    color: #64748b;
    margin-bottom: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const InputGroup = styled.div`
  position: relative;
  width: 100%;

  .icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
  }

  input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    transition: all 0.2s;

    &:focus {
      outline: none;
      border-color: #4C51BF;
      box-shadow: 0 0 0 3px rgba(76, 81, 191, 0.1);
    }

    &:disabled {
      background-color: #f1f5f9;
      cursor: not-allowed;
    }

    &::placeholder {
      color: #94a3b8;
    }
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 0.875rem 1rem;
  background-color: #4C51BF;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    background-color: #434190;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  padding: 0.75rem;
  background-color: #fff5f5;
  border-radius: 0.5rem;
  border: 1px solid #feb2b2;
`;