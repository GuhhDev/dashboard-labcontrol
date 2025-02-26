import React, { createContext, useContext, ReactNode } from 'react';
import { useKeycloak } from '@react-keycloak/web';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => void;
  user: {
    name?: string;
    email?: string;
    roles?: string[];
  } | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { keycloak, initialized } = useKeycloak();

  const login = async () => {
    try {
      await keycloak?.login({
        redirectUri: window.location.origin + window.location.pathname + window.location.search
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    const returnUrl = sessionStorage.getItem('last_url') || '/login';
    keycloak?.logout({
      redirectUri: window.location.origin + returnUrl
    });
  };

  const value = {
    isAuthenticated: !!keycloak?.authenticated,
    login,
    logout,
    user: keycloak?.authenticated ? {
      name: keycloak.tokenParsed?.name,
      email: keycloak.tokenParsed?.email,
      roles: keycloak.realmAccess?.roles
    } : null,
    isLoading: !initialized
  };

  if (!initialized) {
    return <div>Carregando...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};