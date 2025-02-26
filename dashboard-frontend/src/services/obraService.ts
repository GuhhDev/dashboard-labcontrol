import api from './api';
import { Cliente } from './clienteService';

export interface Obra {
  id: number;
  nome: string;
  endereco: string;
  cliente: Cliente;
  responsavel?: string;
  dataInicio?: string;
  dataPrevisaoTermino?: string;
  status?: 'EM_ANDAMENTO' | 'CONCLUIDA' | 'PARALISADA';
}

class ObraService {
  async listarObras(): Promise<Obra[]> {
    const response = await api.get('/obras');
    return response.data;
  }

  async getObra(id: number): Promise<Obra> {
    const response = await api.get(`/obras/${id}`);
    return response.data;
  }

  async criarObra(obra: Omit<Obra, 'id'>): Promise<Obra> {
    const response = await api.post('/obras', obra);
    return response.data;
  }

  async atualizarObra(id: number, obra: Omit<Obra, 'id'>): Promise<Obra> {
    const response = await api.put(`/obras/${id}`, obra);
    return response.data;
  }

  async deletarObra(id: number): Promise<void> {
    await api.delete(`/obras/${id}`);
  }

  async listarObrasPorCliente(clienteId: number): Promise<Obra[]> {
    const response = await api.get(`/obras/cliente/${clienteId}`);
    return response.data;
  }
}

export default new ObraService();
