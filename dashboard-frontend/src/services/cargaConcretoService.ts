import api from './api';
import { Obra } from './obraService';

export interface ClasseResistencia {
  id: number;
  nome: string;
  descricao?: string;
}

export interface Concreteira {
  id: number;
  nome: string;
  cnpj?: string;
  endereco?: string;
}

export interface CargaConcreto {
  id: number;
  notaFiscal: string;
  dataHoraChegada: string;
  dataHoraDescarregamento?: string;
  placa?: string;
  classeResistencia: ClasseResistencia;
  concreteira: Concreteira;
  obra: Obra;
  volumeConcreto?: number;
  slump?: string;
  motorista?: string;
  localPecaConcretada?: string;
  etiquetasPecas?: string;
  registroProjeto?: string;
  observacoes?: string;
}

class CargaConcretoService {
  async listarCargas(): Promise<CargaConcreto[]> {
    const response = await api.get('/cargas');
    return response.data;
  }

  async getCarga(id: number): Promise<CargaConcreto> {
    const response = await api.get(`/cargas/${id}`);
    return response.data;
  }

  async criarCarga(carga: Omit<CargaConcreto, 'id'>): Promise<CargaConcreto> {
    const response = await api.post('/cargas', carga);
    return response.data;
  }

  async atualizarCarga(id: number, carga: Omit<CargaConcreto, 'id'>): Promise<CargaConcreto> {
    const response = await api.put(`/cargas/${id}`, carga);
    return response.data;
  }

  async deletarCarga(id: number): Promise<void> {
    await api.delete(`/cargas/${id}`);
  }

  async listarCargasPorObra(obraId: number): Promise<CargaConcreto[]> {
    const response = await api.get(`/cargas/obra/${obraId}`);
    return response.data;
  }

  async listarClassesResistencia(): Promise<ClasseResistencia[]> {
    const response = await api.get('/classes-resistencia');
    return response.data;
  }

  async listarConcreteiras(): Promise<Concreteira[]> {
    const response = await api.get('/concreteiras');
    return response.data;
  }
}

export default new CargaConcretoService();
