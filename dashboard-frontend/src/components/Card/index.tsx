import React from 'react';
import { Container, Title, Value } from './styles';

interface CardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, value, icon }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Value>{value}</Value>
      {icon}
    </Container>
  );
};

export default Card;