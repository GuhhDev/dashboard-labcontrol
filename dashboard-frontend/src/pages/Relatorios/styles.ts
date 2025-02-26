import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h1 {
    font-size: 24px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primary}dd;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 4px;

    label {
      font-size: 12px;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.text};
    }

    input, select {
      padding: 8px 12px;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      min-width: 180px;
      font-size: 14px;

      &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
      }

      &:disabled {
        background-color: #f7fafc;
        cursor: not-allowed;
      }
    }
  }

  .filter-actions {
    display: flex;
    align-items: flex-end;
    gap: 8px;

    button {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .filter-button {
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;

      &:hover {
        background-color: ${({ theme }) => theme.colors.primary}dd;
      }
    }

    .clear-button {
      background-color: #e2e8f0;
      color: ${({ theme }) => theme.colors.text};

      &:hover {
        background-color: #cbd5e0;
      }
    }
  }
`;

export const Content = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 16px;
  flex: 1;

  .loading {
    padding: 24px;
    text-align: center;
    color: ${({ theme }) => theme.colors.text};
  }

  .no-data {
    text-align: center;
    padding: 24px;
    color: #718096;
  }
`;

export const ReportList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ReportCard = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }

  .report-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.primary}20;
    color: ${({ theme }) => theme.colors.primary};
    margin-right: 16px;
  }

  .report-info {
    flex: 1;

    h3 {
      font-size: 16px;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.text};
      margin: 0 0 4px 0;
    }

    .report-type {
      font-size: 14px;
      color: #4a5568;
      margin: 0 0 4px 0;
    }

    .report-date {
      font-size: 12px;
      color: #718096;
      margin: 0;
    }
  }

  .download-button {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background-color: ${({ theme }) => theme.colors.primary}10;
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary}30;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary}20;
    }
  }
`;
