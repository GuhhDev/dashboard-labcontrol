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

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary}dd;
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
  overflow: hidden;

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

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 12px 16px;
    text-align: left;
  }

  th {
    background-color: #f7fafc;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    font-size: 14px;
    border-bottom: 1px solid #e2e8f0;
  }

  td {
    border-bottom: 1px solid #e2e8f0;
    font-size: 14px;
    color: #4a5568;
  }

  tr:last-child td {
    border-bottom: none;
  }

  .action-icon {
    background: none;
    border: none;
    cursor: pointer;
    color: #718096;
    margin-right: 8px;
    padding: 4px;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f7fafc;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const StatusBadge = styled.span<{ color: string }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${({ color }) => 
    color === 'green' ? '#C6F6D5' :
    color === 'blue' ? '#BEE3F8' :
    color === 'orange' ? '#FEEBC8' :
    color === 'red' ? '#FED7D7' : '#E2E8F0'
  };
  color: ${({ color }) => 
    color === 'green' ? '#22543D' :
    color === 'blue' ? '#2A4365' :
    color === 'orange' ? '#7B341E' :
    color === 'red' ? '#822727' : '#4A5568'
  };
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 16px;
  border-top: 1px solid #e2e8f0;

  .pagination-button {
    padding: 6px 12px;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    background-color: white;
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
    transition: all 0.2s;

    &:hover:not(:disabled) {
      background-color: #f7fafc;
      border-color: #cbd5e0;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .pagination-info {
    font-size: 14px;
    color: #718096;
  }
`;
