import api from './api';

export interface DashboardStats {
  totalAmostras: number;
  ensaiosAgendados: number;
  ensaiosRealizados: number;
  ensaiosAtrasados: number;
  ensaiosARealizarHoje: number;
}

export interface EnsaiosPorStatus {
  status: string;
  quantidade: number;
}

export interface ResultadosPorPeriodo {
  periodo: string;
  dentroEsperado: number;
  muitoBaixo: number;
}

export interface AmostrasPorObra {
  nomeObra: string;
  quantidadeAmostras: number;
}

class DashboardService {
  async getStats(): Promise<DashboardStats> {
    const response = await api.get<DashboardStats>('/dashboard/stats');
    return response.data;
  }

  async getEnsaiosPorStatus(): Promise<EnsaiosPorStatus[]> {
    const response = await api.get<EnsaiosPorStatus[]>('/dashboard/ensaios-por-status');
    return response.data;
  }

  async getResultadosPorPeriodo(periodo: 'dia' | 'semana' | 'mes' = 'mes'): Promise<ResultadosPorPeriodo[]> {
    const response = await api.get<ResultadosPorPeriodo[]>(`/dashboard/resultados-por-periodo?periodo=${periodo}`);
    return response.data;
  }

  async getAmostrasPorObra(): Promise<AmostrasPorObra[]> {
    const response = await api.get<AmostrasPorObra[]>('/dashboard/amostras-por-obra');
    return response.data;
  }
}

export default new DashboardService();
