import { useState, useEffect } from 'react';
import { FormGroup, FormRow, FormActions, ListContainer, Table } from './styles';
import clienteService, { Cliente } from '../../services/clienteService';
import { Search, Edit, Trash } from 'lucide-react';

const ClienteForm = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Omit<Cliente, 'id'>>({
    nome: '',
    cnpj: '',
    endereco: '',
    telefone: '',
    email: '',
    contato: ''
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
    setLoading(true);
    try {
      const data = await clienteService.listarClientes();
      setClientes(data);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
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
    
    if (!formData.cnpj.trim()) {
      newErrors.cnpj = 'CNPJ é obrigatório';
    } else if (!/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(formData.cnpj) && 
               !/^\d{14}$/.test(formData.cnpj)) {
      newErrors.cnpj = 'CNPJ inválido';
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

  const formatCNPJ = (value: string) => {
    // Remove tudo que não é dígito
    const digits = value.replace(/\D/g, '');
    
    if (digits.length <= 14) {
      // Formata como CNPJ: 00.000.000/0000-00
      return digits
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
    }
    
    return digits.slice(0, 14);
  };

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCNPJ = formatCNPJ(e.target.value);
    setFormData((prev) => ({ ...prev, cnpj: formattedCNPJ }));
    
    if (errors.cnpj) {
      setErrors((prev) => ({ ...prev, cnpj: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      if (editingId) {
        await clienteService.atualizarCliente(editingId, formData);
      } else {
        await clienteService.criarCliente(formData);
      }
      
      resetForm();
      carregarClientes();
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  const handleEdit = (cliente: Cliente) => {
    setFormData({
      nome: cliente.nome,
      cnpj: cliente.cnpj,
      endereco: cliente.endereco,
      telefone: cliente.telefone || '',
      email: cliente.email || '',
      contato: cliente.contato || ''
    });
    setEditingId(cliente.id);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await clienteService.deletarCliente(id);
        carregarClientes();
      } catch (error) {
        console.error('Erro ao excluir cliente:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      cnpj: '',
      endereco: '',
      telefone: '',
      email: '',
      contato: ''
    });
    setEditingId(null);
    setErrors({});
  };

  const filteredClientes = clientes.filter(cliente => 
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.cnpj.includes(searchTerm) ||
    (cliente.contato && cliente.contato.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <label htmlFor="nome">Nome do Cliente *</label>
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
            <label htmlFor="cnpj">CNPJ *</label>
            <input
              type="text"
              id="cnpj"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleCNPJChange}
              placeholder="00.000.000/0000-00"
            />
            {errors.cnpj && <span className="error-message">{errors.cnpj}</span>}
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
          <label htmlFor="contato">Pessoa de Contato</label>
          <input
            type="text"
            id="contato"
            name="contato"
            value={formData.contato}
            onChange={handleInputChange}
          />
        </FormGroup>
        
        <FormActions>
          <button type="button" className="cancel-button" onClick={resetForm}>
            Cancelar
          </button>
          <button type="submit" className="save-button">
            {editingId ? 'Atualizar' : 'Salvar'} Cliente
          </button>
        </FormActions>
      </form>
      
      <ListContainer>
        <div className="list-header">
          <h2>Clientes Cadastrados</h2>
          <div className="search-container">
            <Search size={16} />
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {loading ? (
          <div className="loading">Carregando clientes...</div>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CNPJ</th>
                <th>Endereço</th>
                <th>Contato</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.length > 0 ? (
                filteredClientes.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>{cliente.nome}</td>
                    <td>{cliente.cnpj}</td>
                    <td>{cliente.endereco}</td>
                    <td>{cliente.contato || '-'}</td>
                    <td>
                      <button
                        type="button"
                        className="action-icon"
                        onClick={() => handleEdit(cliente)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        type="button"
                        className="action-icon delete"
                        onClick={() => handleDelete(cliente.id)}
                      >
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="no-data">
                    Nenhum cliente encontrado
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

export default ClienteForm;
