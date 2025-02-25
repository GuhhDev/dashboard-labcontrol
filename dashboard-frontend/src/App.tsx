import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactKeycloakProvider, AuthClientEvent } from '@react-keycloak/web';
import type { KeycloakError } from 'keycloak-js';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import keycloak from './config/keycloak';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

const theme = {
  colors: {
    primary: '#4C51BF',
    secondary: '#48BB78',
    warning: '#ED8936',
    danger: '#E53E3E',
    background: '#F5F6FA',
    text: '#1A2233',
  },
};

function App() {
  const [isReady, setIsReady] = React.useState(false);

  const handleKeycloakEvent = (event: AuthClientEvent, error?: KeycloakError) => {
    if (error) {
      console.error('Keycloak event error:', error);
    }
    console.log('Keycloak event:', event);
    
    if (event === 'onInitSuccess') {
      setIsReady(true);
    }
  };

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        onLoad: 'login-required',
        redirectUri: 'http://localhost:5173',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        pkceMethod: 'S256'
      }}
      onEvent={handleKeycloakEvent}
      LoadingComponent={<div>Carregando autenticação...</div>}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <>
                      <Sidebar />
                      <Dashboard />
                    </>
                  </PrivateRoute>
                }
              />
              <Route
                path="/amostras"
                element={
                  <PrivateRoute>
                    <>
                      <Sidebar />
                      <div>Amostras</div>
                    </>
                  </PrivateRoute>
                }
              />
              <Route
                path="/relatorios"
                element={
                  <PrivateRoute>
                    <>
                      <Sidebar />
                      <div>Relatórios</div>
                    </>
                  </PrivateRoute>
                }
              />
              <Route
                path="/configuracoes"
                element={
                  <PrivateRoute>
                    <>
                      <Sidebar />
                      <div>Configurações</div>
                    </>
                  </PrivateRoute>
                }
              />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ReactKeycloakProvider>
  );
}

export default App;