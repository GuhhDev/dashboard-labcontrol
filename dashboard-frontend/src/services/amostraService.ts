import api from './api';

export interface ClasseResistencia {
  id: number;
  nome: string;
}

export interface IdadeCP {
  id: number;
  idade: number;
}

export interface Ensaio {
  id: number;
  dataEnsaio: string;
  resultado: number;
  formaRuptura: string;
  desvioPadrao: number;
  coeficienteVariacao: number;
  fotosUrls: string[];
  status: 'AGENDADO' | 'A_REALIZAR' | 'REALIZADO' | 'ATRASADO';
  resultadoAvaliacao: 'DENTRO_ESPERADO' | 'MUITO_BAIXO';
  idadeCP: IdadeCP;
}

export interface CargaConcreto {
  id: number;
  numeroCarga: string;
  data: string;
  numeroNF: string;
  volumeConcreto: number;
  horarioChegada: string;
  horarioSaida: string;
  slump: string;
  motorista: string;
  caminhao: string;
  localPecaConcretada: string;
  etiquetasPecas: string;
  registroProjeto: string;
  fotosUrls: string[];
}

export interface Amostra {
  id: number;
  idAmostra: string;
  dataRetirada: string;
  carga: CargaConcreto;
  resistenciaProjeto: ClasseResistencia;
  idadesEscolhidas: IdadeCP[];
  ensaios: Ensaio[];
}

class AmostraService {
  async listarAmostras(params?: {
    page?: number;
    size?: number;
    dataInicio?: string;
    dataFim?: string;
    status?: string;
  }): Promise<{ content: Amostra[]; totalElements: number }> {
    const response = await api.get('/amostras', { params });
    return response.data;
  }

  async getAmostra(id: number): Promise<Amostra> {
    const response = await api.get(`/amostras/${id}`);
    return response.data;
  }

  async criarAmostra(amostra: Omit<Amostra, 'id' | 'ensaios'>): Promise<Amostra> {
    const response = await api.post('/amostras', amostra);
    return response.data;
  }

  async atualizarAmostra(id: number, amostra: Omit<Amostra, 'id' | 'ensaios'>): Promise<Amostra> {
    const response = await api.put(`/amostras/${id}`, amostra);
    return response.data;
  }

  async deletarAmostra(id: number): Promise<void> {
    await api.delete(`/amostras/${id}`);
  }

  async getEnsaiosPorStatus(): Promise<{ status: string; quantidade: number }[]> {
    const response = await api.get('/amostras/ensaios/status');
    return response.data;
  }

  async getResultadosPorPeriodo(periodo: 'dia' | 'semana' | 'mes' = 'mes'): Promise<{
    periodo: string;
    dentroEsperado: number;
    muitoBaixo: number;
  }[]> {
    const response = await api.get(`/amostras/resultados?periodo=${periodo}`);
    return response.data;
  }
}

export default new AmostraService();
