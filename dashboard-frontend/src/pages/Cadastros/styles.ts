import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 15px 10px;
  }
`;

export const TabsHeader = styled.div`
  margin-bottom: 20px;

  h1 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 8px;

    @media (max-width: 768px) {
      text-align: center;
    }
  }

  p {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.7;
    font-size: 14px;

    @media (max-width: 768px) {
      text-align: center;
      font-size: 13px;
    }
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 1px;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    justify-content: flex-start;
    -webkit-overflow-scrolling: touch;
  }
`;

export const TabButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>`
  padding: 10px 20px;
  background: none;
  border: none;
  border-bottom: 2px solid ${({ active, theme }) => (active ? theme.colors.primary : 'transparent')};
  color: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.text)};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    padding: 10px 15px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 13px;
  }
`;

export const TabContent = styled.div`
  padding: 20px 0;

  @media (max-width: 768px) {
    padding: 15px 0;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
  width: 100%;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
  }

  input, select, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    font-size: 14px;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }

  .error-message {
    color: ${({ theme }) => theme.colors.error};
    font-size: 12px;
    margin-top: 5px;
    display: block;
  }

  .checkbox-group {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 10px;
  }

  .checkbox-item {
    display: flex;
    align-items: center;
    gap: 5px;

    input[type="checkbox"] {
      width: auto;
    }
  }
`;

export const FormRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;

  button {
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;

    &.cancel-button {
      background: none;
      border: 1px solid ${({ theme }) => theme.colors.border};
      color: ${({ theme }) => theme.colors.text};

      &:hover {
        background: ${({ theme }) => theme.colors.background};
      }
    }

    &.save-button {
      background: ${({ theme }) => theme.colors.primary};
      border: 1px solid ${({ theme }) => theme.colors.primary};
      color: white;

      &:hover {
        background: ${({ theme }) => theme.colors.primaryDark};
      }
    }
  }

  @media (max-width: 480px) {
    flex-direction: column-reverse;

    button {
      width: 100%;
    }
  }
`;

export const ListContainer = styled.div`
  margin-top: 40px;

  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;

    h2 {
      font-size: 18px;
      color: ${({ theme }) => theme.colors.text};
    }

    .search-container {
      display: flex;
      align-items: center;
      border: 1px solid ${({ theme }) => theme.colors.border};
      border-radius: 4px;
      padding: 5px 10px;

      input {
        border: none;
        outline: none;
        padding: 5px;
        margin-left: 5px;
        font-size: 14px;
      }
    }
  }

  .loading {
    text-align: center;
    padding: 20px;
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  th {
    background-color: ${({ theme }) => theme.colors.background};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textDark};
  }

  tr:hover {
    background-color: ${({ theme }) => theme.colors.backgroundHover};
  }

  .action-icon {
    background: none;
    border: none;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary};
    margin-right: 10px;
    padding: 5px;
    border-radius: 4px;

    &:hover {
      background-color: ${({ theme }) => theme.colors.background};
    }

    &.delete {
      color: ${({ theme }) => theme.colors.error};
    }
  }

  .no-data {
    text-align: center;
    color: ${({ theme }) => theme.colors.textLight};
    padding: 20px;
  }

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;

    th, td {
      padding: 10px;
    }
  }
`;
