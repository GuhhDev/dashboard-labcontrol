import Keycloak from 'keycloak-js';

// Create a singleton instance
let keycloakInstance: Keycloak | null = null;

const initKeycloak = () => {
  if (!keycloakInstance) {
    keycloakInstance = new Keycloak({
      url: import.meta.env.VITE_KEYCLOAK_URL,
      realm: import.meta.env.VITE_KEYCLOAK_REALM,
      clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID
    });
  }
  return keycloakInstance;
};

export default initKeycloak();