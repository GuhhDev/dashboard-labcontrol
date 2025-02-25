import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Container, LoginCard, LoginButton, InputGroup, ErrorMessage } from './styles';
import * as Icons from 'lucide-react';

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const validateForm = () => {
    if (!formData.email) {
      setError('E-mail é obrigatório');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('E-mail inválido');
      return false;
    }
    if (!formData.password) {
      setError('Senha é obrigatória');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Senha deve ter no mínimo 6 caracteres');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await login();
      navigate(from, { replace: true });
    } catch (err) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  return (
    <Container>
      <LoginCard>
        <div className="logo">
          <Icons.Beaker size={32} />
          <h1>LabControl</h1>
        </div>
        <p>Faça login para acessar o sistema</p>

        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Icons.Mail size={20} className="icon" />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />
          </InputGroup>

          <InputGroup>
            <Icons.Lock size={20} className="icon" />
            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
            />
          </InputGroup>

          {error && (
            <ErrorMessage>
              <Icons.AlertCircle size={16} />
              {error}
            </ErrorMessage>
          )}

          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </LoginButton>
        </form>
      </LoginCard>
    </Container>
  );
};

export default Login;