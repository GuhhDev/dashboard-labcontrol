import api from './api';

export interface RelatorioFiltros {
  dataInicio?: string;
  dataFim?: string;
  clienteId?: number;
  obraId?: number;
  classeResistenciaId?: number;
  tipoRelatorio: 'AMOSTRAS' | 'ENSAIOS' | 'NAO_CONFORMIDADES' | 'DESEMPENHO';
}

export interface Relatorio {
  id: number;
  titulo: string;
  dataGeracao: string;
  tipo: string;
  arquivoUrl: string;
  parametros: Record<string, any>;
}

class RelatorioService {
  async listarRelatorios(): Promise<Relatorio[]> {
    const response = await api.get('/relatorios');
    return response.data;
  }

  async getRelatorio(id: number): Promise<Relatorio> {
    const response = await api.get(`/relatorios/${id}`);
    return response.data;
  }

  async gerarRelatorio(filtros: RelatorioFiltros): Promise<{ id: number; url: string }> {
    const response = await api.post('/relatorios/gerar', filtros);
    return response.data;
  }

  async downloadRelatorio(id: number): Promise<Blob> {
    const response = await api.get(`/relatorios/${id}/download`, {
      responseType: 'blob'
    });
    return response.data;
  }

  async deletarRelatorio(id: number): Promise<void> {
    await api.delete(`/relatorios/${id}`);
  }
}

export default new RelatorioService();
