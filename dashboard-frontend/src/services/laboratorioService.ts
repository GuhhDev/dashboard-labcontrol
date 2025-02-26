import api from './api';
import { Laboratorio, LaboratorioFormData } from '../types/laboratorio';

/**
 * Serviço de gerenciamento de laboratórios
 */
class LaboratorioService {
  /**
   * Lista todos os laboratórios cadastrados
   * @returns Promise contendo a lista de laboratórios
   */
  async listarLaboratorios(): Promise<Laboratorio[]> {
    try {
      console.log('Iniciando requisição para listar laboratórios...');
      const response = await api.get('/laboratorios');
      console.log('Resposta da API (laboratórios):', response.data);
      
      let laboratorios: Laboratorio[];
      
      if (!response.data) {
        console.error('Resposta vazia da API');
        return [];
      }
      
      if (Array.isArray(response.data)) {
        console.log('Resposta em formato de array, retornando diretamente');
        laboratorios = response.data;
      } else if (response.data && typeof response.data === 'object') {
        // Verifica se a resposta tem uma propriedade que contém o array de laboratórios
        console.log('Resposta em formato de objeto, buscando array contido no objeto');
        const possibleArrayProps = ['content', 'items', 'data', 'laboratorios', 'results'];
        
        for (const prop of possibleArrayProps) {
          if (response.data[prop] && Array.isArray(response.data[prop])) {
            console.log(`Usando propriedade '${prop}' com o array de laboratórios`);
            laboratorios = response.data[prop];
            return laboratorios;
          }
        }
        
        // Se chegou aqui, não encontrou um array em propriedades conhecidas
        console.warn('Não foi possível identificar um array na resposta, convertendo objeto em array');
        
        // Tenta converter o próprio objeto em um array
        const entries = Object.entries(response.data);
        if (entries.length > 0) {
          laboratorios = entries.map(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
              return { id: key, ...value } as Laboratorio;
            }
            return null;
          }).filter(Boolean) as Laboratorio[];
          
          return laboratorios;
        }
        
        console.error('Não foi possível converter a resposta em um array válido');
        return [];
      } else {
        console.error('Formato de resposta não reconhecido');
        return [];
      }
      
      return laboratorios;
    } catch (error) {
      console.error('Erro ao listar laboratórios:', error);
      throw error;
    }
  }

  /**
   * Busca um laboratório específico pelo ID
   * @param id ID do laboratório a ser buscado
   * @returns Promise contendo o laboratório encontrado
   */
  async buscarLaboratorioPorId(id: number): Promise<Laboratorio> {
    try {
      console.log(`Buscando laboratório com ID ${id}...`);
      const response = await api.get(`/laboratorios/${id}`);
      console.log('Laboratório encontrado:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar laboratório com ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Cria um novo laboratório
   * @param laboratorio Dados do laboratório a ser criado
   * @returns Promise contendo o laboratório criado
   */
  async criarLaboratorio(laboratorio: LaboratorioFormData): Promise<Laboratorio> {
    try {
      console.log('Criando novo laboratório:', laboratorio);
      const response = await api.post('/laboratorios', laboratorio);
      console.log('Laboratório criado com sucesso:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar laboratório:', error);
      throw error;
    }
  }

  /**
   * Atualiza um laboratório existente
   * @param id ID do laboratório a ser atualizado
   * @param laboratorio Novos dados do laboratório
   * @returns Promise contendo o laboratório atualizado
   */
  async atualizarLaboratorio(id: number, laboratorio: LaboratorioFormData): Promise<Laboratorio> {
    try {
      console.log(`Atualizando laboratório com ID ${id}:`, laboratorio);
      const response = await api.put(`/laboratorios/${id}`, laboratorio);
      console.log('Laboratório atualizado com sucesso:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar laboratório com ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Deleta um laboratório existente
   * @param id ID do laboratório a ser deletado
   * @returns Promise vazia em caso de sucesso
   */
  async deletarLaboratorio(id: number): Promise<void> {
    try {
      console.log(`Deletando laboratório com ID ${id}...`);
      await api.delete(`/laboratorios/${id}`);
      console.log(`Laboratório com ID ${id} deletado com sucesso`);
    } catch (error) {
      console.error(`Erro ao deletar laboratório com ID ${id}:`, error);
      throw error;
    }
  }
}

export default new LaboratorioService();
