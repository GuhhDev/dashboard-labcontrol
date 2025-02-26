import axios from 'axios';
import keycloak from '../config/keycloak';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 30000, // 30 segundos
});

// Log para depuração das chamadas à API
api.interceptors.request.use(
  (config) => {
    console.log(`[API] Requisição para ${config.method?.toUpperCase()} ${config.url}`, config);
    
    // Adiciona o token de autenticação em todas as requisições
    if (keycloak.token) {
      config.headers.Authorization = `Bearer ${keycloak.token}`;
    }
    
    return config;
  },
  (error) => {
    console.error('[API] Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Log para depuração das respostas da API
api.interceptors.response.use(
  (response) => {
    console.log(`[API] Resposta de ${response.config.url}:`, response.data);
    return response;
  },
  async (error) => {
    console.error('[API] Erro na resposta:', error);
    
    if (!error.response) {
      console.error('[API] Sem resposta do servidor (possível problema de rede)');
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    // Renovação automática do token quando expirado
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log('[API] Token expirado, tentando renovar...');
      originalRequest._retry = true;

      try {
        await keycloak.updateToken(70);
        console.log('[API] Token renovado com sucesso');
        originalRequest.headers.Authorization = `Bearer ${keycloak.token}`;
        return api(originalRequest);
      } catch (err) {
        console.error('[API] Falha ao renovar token, redirecionando para login');
        keycloak.login();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
