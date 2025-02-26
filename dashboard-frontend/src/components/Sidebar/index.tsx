import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container, Logo, NavItem, UserSection, LogoutButton, MobileToggle } from './styles';
import * as Icons from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
      if (window.innerWidth > 480) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {isMobile && (
        <MobileToggle onClick={toggleMobileMenu}>
          {isMobileOpen ? <Icons.X size={24} /> : <Icons.Menu size={24} />}
        </MobileToggle>
      )}
      
      <Container className={isMobileOpen ? 'open' : ''}>
        <Logo>
          <Icons.Beaker size={24} />
          LabControl
        </Logo>
        
        <nav>
          <NavItem to="/" $active={location.pathname === '/'}>
            <Icons.LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavItem>
          <NavItem to="/amostras" $active={location.pathname === '/amostras'}>
            <Icons.Activity size={20} />
            <span>Amostras</span>
          </NavItem>
          <NavItem to="/relatorios" $active={location.pathname === '/relatorios'}>
            <Icons.BarChart size={20} />
            <span>Relatórios</span>
          </NavItem>
          <NavItem to="/cadastros" $active={location.pathname === '/cadastros'}>
            <Icons.FileText size={20} />
            <span>Cadastros</span>
          </NavItem>
          <NavItem to="/configuracoes" $active={location.pathname === '/configuracoes'}>
            <Icons.Settings size={20} />
            <span>Configurações</span>
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
    </>
  );
};

export default Sidebar;