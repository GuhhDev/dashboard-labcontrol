import { useLocation } from 'react-router-dom';
import { Container, Logo, NavItem, UserSection, LogoutButton } from './styles';
import * as Icons from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <Container>
      <Logo>
        <Icons.Beaker size={24} />
        LabControl
      </Logo>
      
      <nav>
        <NavItem to="/" $active={location.pathname === '/'}>
          <Icons.LayoutDashboard size={20} />
          Dashboard
        </NavItem>
        <NavItem to="/amostras" $active={location.pathname === '/amostras'}>
          <Icons.Activity size={20} />
          Amostras
        </NavItem>
        <NavItem to="/relatorios" $active={location.pathname === '/relatorios'}>
          <Icons.Users size={20} />
          Relatórios
        </NavItem>
        <NavItem to="/configuracoes" $active={location.pathname === '/configuracoes'}>
          <Icons.Settings size={20} />
          Configurações
        </NavItem>
      </nav>

      <UserSection>
        <div className="user-info">
          <span className="name">{user?.name}</span>
          <span className="email">{user?.email}</span>
        </div>
        <LogoutButton onClick={logout}>
          <Icons.LogOut size={20} />
        </LogoutButton>
      </UserSection>
    </Container>
  );
};

export default Sidebar;