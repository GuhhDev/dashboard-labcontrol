import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente para rastrear o histórico de URLs e salvar a última URL visitada
 * Isso é útil para redirecionar o usuário de volta para a última página após login ou redirecionamentos
 */
const UrlHistoryTracker: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log('Salvando URL atual:', location.pathname + location.search);
    sessionStorage.setItem('last_url', location.pathname + location.search);
  }, [location]);
  
  return null; // Componente invisível, apenas para efeito de lado
};

export default UrlHistoryTracker;
