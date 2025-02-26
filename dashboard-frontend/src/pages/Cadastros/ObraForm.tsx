import { useState, useEffect } from 'react';
import { FormGroup, FormRow, FormActions, ListContainer, Table } from './styles';
import obraService, { Obra } from '../../services/obraService';
import clienteService, { Cliente } from '../../services/clienteService';
import { Search, Edit, Trash } from 'lucide-react';

const ObraForm = () => {
  const [obras, setObras] = useState<Obra[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Omit<Obra, 'id' | 'cliente'> & { clienteId: number | '' }>({
    nome: '',
    endereco: '',
    clienteId: '',
    responsavel: '',
    dataInicio: '',
    dataPrevisaoTermino: '',
    status: 'EM_ANDAMENTO'
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [obrasData, clientesData] = await Promise.all([
        obraService.listarObras(),
        clienteService.listarClientes()
      ]);
      setObras(obrasData);
      setClientes(clientesData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Limpa o erro do campo quando o usuário digita
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }
    
    if (!formData.endereco.trim()) {
      newErrors.endereco = 'Endereço é obrigatório';
    }
    
    if (!formData.clienteId) {
      newErrors.clienteId = 'Cliente é obrigatório';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const clienteSelecionado = clientes.find(c => c.id === Number(formData.clienteId));
      
      if (!clienteSelecionado) {
        setErrors({ clienteId: 'Cliente inválido' });
        return;
      }
      
      const obraData = {
        nome: formData.nome,
        endereco: formData.endereco,
        cliente: clienteSelecionado,
        responsavel: formData.responsavel,
        dataInicio: formData.dataInicio || undefined,
        dataPrevisaoTermino: formData.dataPrevisaoTermino || undefined,
        status: formData.status as 'EM_ANDAMENTO' | 'CONCLUIDA' | 'PARALISADA'
      };
      
      if (editingId) {
        await obraService.atualizarObra(editingId, obraData);
      } else {
        await obraService.criarObra(obraData);
      }
      
      resetForm();
      carregarDados();
    } catch (error) {
      console.error('Erro ao salvar obra:', error);
    }
  };

  const handleEdit = (obra: Obra) => {
    setFormData({
      nome: obra.nome,
      endereco: obra.endereco,
      clienteId: obra.cliente.id,
      responsavel: obra.responsavel || '',
      dataInicio: obra.dataInicio || '',
      dataPrevisaoTermino: obra.dataPrevisaoTermino || '',
      status: obra.status || 'EM_ANDAMENTO'
    });
    setEditingId(obra.id);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta obra?')) {
      try {
        await obraService.deletarObra(id);
        carregarDados();
      } catch (error) {
        console.error('Erro ao excluir obra:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      endereco: '',
      clienteId: '',
      responsavel: '',
      dataInicio: '',
      dataPrevisaoTermino: '',
      status: 'EM_ANDAMENTO'
    });
    setEditingId(null);
    setErrors({});
  };

  const filteredObras = obras.filter(obra => 
    obra.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    obra.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
    obra.cliente.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatarStatus = (status: string | undefined) => {
    switch (status) {
      case 'EM_ANDAMENTO':
        return 'Em Andamento';
      case 'CONCLUIDA':
        return 'Concluída';
      case 'PARALISADA':
        return 'Paralisada';
      default:
        return 'Em Andamento';
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <label htmlFor="nome">Nome da Obra *</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
            />
            {errors.nome && <span className="error-message">{errors.nome}</span>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="clienteId">Cliente *</label>
            <select
              id="clienteId"
              name="clienteId"
              value={formData.clienteId}
              onChange={handleInputChange}
            >
              <option value="">Selecione um cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </select>
            {errors.clienteId && <span className="error-message">{errors.clienteId}</span>}
          </FormGroup>
        </FormRow>
        
        <FormGroup>
          <label htmlFor="endereco">Endereço da Obra *</label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            value={formData.endereco}
            onChange={handleInputChange}
          />
          {errors.endereco && <span className="error-message">{errors.endereco}</span>}
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="responsavel">Responsável Técnico</label>
          <input
            type="text"
            id="responsavel"
            name="responsavel"
            value={formData.responsavel}
            onChange={handleInputChange}
          />
        </FormGroup>
        
        <FormRow>
          <FormGroup>
            <label htmlFor="dataInicio">Data de Início</label>
            <input
              type="date"
              id="dataInicio"
              name="dataInicio"
              value={formData.dataInicio}
              onChange={handleInputChange}
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="dataPrevisaoTermino">Previsão de Término</label>
            <input
              type="date"
              id="dataPrevisaoTermino"
              name="dataPrevisaoTermino"
              value={formData.dataPrevisaoTermino}
              onChange={handleInputChange}
            />
          </FormGroup>
        </FormRow>
        
        <FormGroup>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="EM_ANDAMENTO">Em Andamento</option>
            <option value="CONCLUIDA">Concluída</option>
            <option value="PARALISADA">Paralisada</option>
          </select>
        </FormGroup>
        
        <FormActions>
          <button type="button" className="cancel-button" onClick={resetForm}>
            Cancelar
          </button>
          <button type="submit" className="save-button">
            {editingId ? 'Atualizar' : 'Salvar'} Obra
          </button>
        </FormActions>
      </form>
      
      <ListContainer>
        <div className="list-header">
          <h2>Obras Cadastradas</h2>
          <div className="search-container">
            <Search size={16} />
            <input
              type="text"
              placeholder="Buscar obra..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {loading ? (
          <div className="loading">Carregando obras...</div>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Cliente</th>
                <th>Endereço</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredObras.length > 0 ? (
                filteredObras.map((obra) => (
                  <tr key={obra.id}>
                    <td>{obra.nome}</td>
                    <td>{obra.cliente.nome}</td>
                    <td>{obra.endereco}</td>
                    <td>{formatarStatus(obra.status)}</td>
                    <td>
                      <button
                        type="button"
                        className="action-icon"
                        onClick={() => handleEdit(obra)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        type="button"
                        className="action-icon delete"
                        onClick={() => handleDelete(obra.id)}
                      >
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="no-data">
                    Nenhuma obra encontrada
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </ListContainer>
    </div>
  );
};

export default ObraForm;
