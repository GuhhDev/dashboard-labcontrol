import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactKeycloakProvider, AuthClientEvent } from '@react-keycloak/web';
import type { KeycloakError } from 'keycloak-js';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import keycloak from './config/keycloak';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import UrlHistoryTracker from './components/UrlHistoryTracker';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AmostrasPage from './pages/Amostras';
import RelatoriosPage from './pages/Relatorios';
import Cadastros from './pages/Cadastros';

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
  const [, setIsReady] = React.useState(false);

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
        redirectUri: window.location.origin + window.location.pathname,
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        pkceMethod: 'S256',
        checkLoginIframe: false
      }}
      onEvent={handleKeycloakEvent}
      LoadingComponent={<div>Carregando autenticação...</div>}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AuthProvider>
          <Router>
            <UrlHistoryTracker />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <>
                      <Sidebar />
                      <main>
                        <Dashboard />
                      </main>
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
                      <main>
                        <AmostrasPage />
                      </main>
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
                      <main>
                        <RelatoriosPage />
                      </main>
                    </>
                  </PrivateRoute>
                }
              />
               <Route
                path="/cadastros"
                element={
                  <PrivateRoute>
                    <>
                      <Sidebar />
                      <main>
                        <Cadastros />
                      </main>
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
                      <main>
                        <div>Configurações</div>
                      </main>
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