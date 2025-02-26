/**
 * Interface que representa um Laboratório no sistema
 */
export interface Laboratorio {
  /**
   * Identificador único do laboratório
   */
  id: number;
  
  /**
   * Nome do laboratório
   */
  nome: string;
  
  /**
   * Endereço completo do laboratório
   */
  endereco: string;
  
  /**
   * Número de telefone para contato
   */
  telefone?: string;
  
  /**
   * Email para contato
   */
  email?: string;
  
  /**
   * Nome do responsável técnico do laboratório
   */
  responsavel?: string;
  
  /**
   * Descrição da certificação do laboratório (ex: ISO 9001)
   */
  certificacao?: string;
  
  /**
   * Data de cadastro no sistema
   */
  dataCadastro?: string;
  
  /**
   * Status do laboratório (ativo/inativo)
   */
  status?: string;
}

/**
 * Tipo para representar os dados necessários para criar ou atualizar um laboratório
 */
export type LaboratorioFormData = Omit<Laboratorio, 'id' | 'dataCadastro' | 'status'>;
