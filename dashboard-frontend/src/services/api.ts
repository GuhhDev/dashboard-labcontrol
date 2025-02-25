import axios from 'axios';
import keycloak from '../config/keycloak';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
});

// Adiciona o token de autenticação em todas as requisições
api.interceptors.request.use(async (config) => {
  if (keycloak.token) {
    config.headers.Authorization = `Bearer ${keycloak.token}`;
  }
  return config;
});

// Interceptor para renovar o token quando expirado
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await keycloak.updateToken(70);
        originalRequest.headers.Authorization = `Bearer ${keycloak.token}`;
        return api(originalRequest);
      } catch (err) {
        keycloak.login();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
