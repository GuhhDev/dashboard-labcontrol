import api from './api';

export interface Cliente {
  id: number;
  nome: string;
  cnpj: string;
  endereco: string;
  telefone?: string;
  email?: string;
  contato?: string;
}

class ClienteService {
  async listarClientes(): Promise<Cliente[]> {
    const response = await api.get('/clientes');
    return response.data;
  }

  async getCliente(id: number): Promise<Cliente> {
    const response = await api.get(`/clientes/${id}`);
    return response.data;
  }

  async criarCliente(cliente: Omit<Cliente, 'id'>): Promise<Cliente> {
    const response = await api.post('/clientes', cliente);
    return response.data;
  }

  async atualizarCliente(id: number, cliente: Omit<Cliente, 'id'>): Promise<Cliente> {
    const response = await api.put(`/clientes/${id}`, cliente);
    return response.data;
  }

  async deletarCliente(id: number): Promise<void> {
    await api.delete(`/clientes/${id}`);
  }
}

export default new ClienteService();
