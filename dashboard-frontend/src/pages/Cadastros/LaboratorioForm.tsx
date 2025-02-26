import { useState, useEffect } from 'react';
import { FormGroup, FormRow, FormActions, ListContainer, Table } from './styles';
import laboratorioService from '../../services/laboratorioService';
import { Laboratorio, LaboratorioFormData } from '../../types/laboratorio';
import { Search, Edit, Trash, Plus } from 'lucide-react';

const LaboratorioForm = () => {
  const [laboratorios, setLaboratorios] = useState<Laboratorio[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<LaboratorioFormData>({
    nome: '',
    endereco: '',
    telefone: '',
    email: '',
    responsavel: '',
    certificacao: ''
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarLaboratorios();
  }, []);

  const carregarLaboratorios = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Iniciando carregamento de laboratórios...');
      const data = await laboratorioService.listarLaboratorios();
      console.log('Dados recebidos:', data);
      
      // Verificação mais detalhada dos dados
      if (!data) {
        console.error('Resposta vazia da API');
        setError('Não foi possível obter dados do servidor');
        setLaboratorios([]);
        return;
      }
      
      if (Array.isArray(data)) {
        console.log(`Array de laboratórios recebido com ${data.length} itens`);
        setLaboratorios(data);
      } else if (typeof data === 'object') {
        // Caso a API retorne um objeto com uma propriedade contendo a lista
        console.log('Objeto recebido:', data);
        // Tentativa de identificar uma propriedade que possa conter o array
        const possibleArrayProps = ['content', 'items', 'data', 'laboratorios', 'results'];
        for (const prop of possibleArrayProps) {
          if (data[prop] && Array.isArray(data[prop])) {
            console.log(`Usando propriedade '${prop}' que contém um array de ${data[prop].length} itens`);
            setLaboratorios(data[prop]);
            break;
          }
        }
        
        // Se não encontrou em propriedades conhecidas, tenta converter o próprio objeto
        if (laboratorios.length === 0) {
          const entries = Object.entries(data);
          if (entries.length > 0) {
            console.log('Tentando converter objeto em array');
            const convertedArray = entries.map(([key, value]) => {
              if (typeof value === 'object' && value !== null) {
                return { id: key, ...value };
              }
              return null;
            }).filter(Boolean) as Laboratorio[];
            setLaboratorios(convertedArray);
          } else {
            console.error('Objeto vazio recebido');
            setError('Formato de dados inesperado');
            setLaboratorios([]);
          }
        }
      } else {
        console.error('Tipo de resposta inesperado:', typeof data);
        setError('Formato de dados inválido');
        setLaboratorios([]);
      }
    } catch (error) {
      console.error('Erro ao carregar laboratórios:', error);
      setError('Erro ao carregar dados. Tente novamente mais tarde.');
      setLaboratorios([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
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
      if (editingId) {
        await laboratorioService.atualizarLaboratorio(editingId, formData);
      } else {
        await laboratorioService.criarLaboratorio(formData);
      }
      
      resetForm();
      carregarLaboratorios();
    } catch (error) {
      console.error('Erro ao salvar laboratório:', error);
      setError('Erro ao salvar os dados. Verifique sua conexão e tente novamente.');
    }
  };

  const handleEdit = (laboratorio: Laboratorio) => {
    setFormData({
      nome: laboratorio.nome,
      endereco: laboratorio.endereco,
      telefone: laboratorio.telefone || '',
      email: laboratorio.email || '',
      responsavel: laboratorio.responsavel || '',
      certificacao: laboratorio.certificacao || ''
    });
    setEditingId(laboratorio.id);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este laboratório?')) {
      try {
        await laboratorioService.deletarLaboratorio(id);
        carregarLaboratorios();
      } catch (error) {
        console.error('Erro ao excluir laboratório:', error);
        setError('Erro ao excluir o laboratório. Tente novamente mais tarde.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      endereco: '',
      telefone: '',
      email: '',
      responsavel: '',
      certificacao: ''
    });
    setEditingId(null);
    setErrors({});
  };

  // Certifica-se de que laboratorios é realmente um array antes de filtrar
  const filteredLaboratorios = Array.isArray(laboratorios)
    ? laboratorios.filter(lab =>
        lab && typeof lab === 'object' && (
          (lab.nome && lab.nome.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (lab.endereco && lab.endereco.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (lab.responsavel && lab.responsavel.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      )
    : [];

  console.log('Laboratórios filtrados:', filteredLaboratorios);
  console.log('Total de laboratórios:', laboratorios.length);
  
  return (
    <div>
      {error && (
        <div style={{ 
          backgroundColor: '#ffebee', 
          color: '#c62828', 
          padding: '10px', 
          borderRadius: '4px', 
          marginBottom: '20px',
          fontSize: '14px' 
        }}>
          <strong>Erro:</strong> {error}
          <button 
            onClick={carregarLaboratorios} 
            style={{ 
              marginLeft: '10px', 
              background: 'none', 
              border: '1px solid #c62828', 
              borderRadius: '4px', 
              padding: '3px 8px', 
              cursor: 'pointer',
              color: '#c62828',
              fontSize: '12px'
            }}
          >
            Tentar novamente
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <label htmlFor="nome">Nome do Laboratório *</label>
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
            <label htmlFor="responsavel">Responsável Técnico</label>
            <input
              type="text"
              id="responsavel"
              name="responsavel"
              value={formData.responsavel}
              onChange={handleInputChange}
            />
          </FormGroup>
        </FormRow>
        
        <FormGroup>
          <label htmlFor="endereco">Endereço *</label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            value={formData.endereco}
            onChange={handleInputChange}
          />
          {errors.endereco && <span className="error-message">{errors.endereco}</span>}
        </FormGroup>
        
        <FormRow>
          <FormGroup>
            <label htmlFor="telefone">Telefone</label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleInputChange}
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </FormGroup>
        </FormRow>
        
        <FormGroup>
          <label htmlFor="certificacao">Certificação</label>
          <input
            type="text"
            id="certificacao"
            name="certificacao"
            value={formData.certificacao}
            onChange={handleInputChange}
          />
        </FormGroup>
        
        <FormActions>
          <button type="button" className="cancel-button" onClick={resetForm}>
            Cancelar
          </button>
          <button type="submit" className="save-button">
            {editingId ? 'Atualizar' : 'Salvar'} Laboratório
          </button>
        </FormActions>
      </form>
      
      <ListContainer>
        <div className="list-header">
          <h2>Laboratórios Cadastrados</h2>
          <div className="search-container">
            <Search size={16} />
            <input
              type="text"
              placeholder="Buscar laboratório..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {loading ? (
          <div className="loading">Carregando laboratórios...</div>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Endereço</th>
                <th>Responsável</th>
                <th>Telefone</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredLaboratorios.length > 0 ? (
                filteredLaboratorios.map((laboratorio) => (
                  <tr key={laboratorio.id}>
                    <td>{laboratorio.nome || '-'}</td>
                    <td>{laboratorio.endereco || '-'}</td>
                    <td>{laboratorio.responsavel || '-'}</td>
                    <td>{laboratorio.telefone || '-'}</td>
                    <td>
                      <button
                        type="button"
                        className="action-icon"
                        onClick={() => handleEdit(laboratorio)}
                        title="Editar"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        type="button"
                        className="action-icon delete"
                        onClick={() => handleDelete(laboratorio.id)}
                        title="Excluir"
                      >
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="no-data">
                    {error ? 'Erro ao carregar dados' : 'Nenhum laboratório encontrado'}
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

export default LaboratorioForm;
