import { useState, useEffect } from 'react';
import { FormGroup, FormRow, FormActions, ListContainer, Table } from './styles';
import amostraService, { Amostra, IdadeCP, ClasseResistencia } from '../../services/amostraService';
import cargaConcretoService, { CargaConcreto } from '../../services/cargaConcretoService';
import clienteService, { Cliente } from '../../services/clienteService';
import obraService, { Obra } from '../../services/obraService';
import { Search, Edit, Trash } from 'lucide-react';

const AmostraForm = () => {
  const [amostras, setAmostras] = useState<Amostra[]>([]);
  const [cargas, setCargas] = useState<CargaConcreto[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [obras, setObras] = useState<Obra[]>([]);
  const [classesResistencia, setClassesResistencia] = useState<ClasseResistencia[]>([]);
  const [idadesCP, setIdadesCP] = useState<IdadeCP[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<{
    idAmostra: string;
    dataRetirada: string;
    cargaId: number | '';
    resistenciaProjetoId: number | '';
    idadesEscolhidasIds: number[];
    clienteId: number | '';
    obraId: number | '';
  }>({
    idAmostra: '',
    dataRetirada: '',
    cargaId: '',
    resistenciaProjetoId: '',
    idadesEscolhidasIds: [],
    clienteId: '',
    obraId: ''
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
      const [
        amostrasData,
        clientesData,
        classesResistenciaData,
        idadesCPData
      ] = await Promise.all([
        amostraService.listarAmostras(),
        clienteService.listarClientes(),
        cargaConcretoService.listarClassesResistencia(),
        // Aqui seria necessário um endpoint para listar as idades dos CPs
        // Por enquanto, vamos criar alguns dados fictícios
        Promise.resolve([
          { id: 1, idade: 7 },
          { id: 2, idade: 14 },
          { id: 3, idade: 28 }
        ])
      ]);
      
      setAmostras(amostrasData.content);
      setClientes(clientesData);
      setClassesResistencia(classesResistenciaData);
      setIdadesCP(idadesCPData);
      
      if (clientesData.length > 0 && formData.clienteId) {
        carregarObrasPorCliente(Number(formData.clienteId));
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const carregarObrasPorCliente = async (clienteId: number) => {
    try {
      const obrasData = await obraService.listarObrasPorCliente(clienteId);
      setObras(obrasData);
      
      if (formData.obraId && obrasData.length > 0) {
        carregarCargasPorObra(Number(formData.obraId));
      }
    } catch (error) {
      console.error('Erro ao carregar obras:', error);
    }
  };

  const carregarCargasPorObra = async (obraId: number) => {
    try {
      const cargasData = await cargaConcretoService.listarCargasPorObra(obraId);
      setCargas(cargasData);
    } catch (error) {
      console.error('Erro ao carregar cargas:', error);
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

  const handleClienteChange = (clienteId: string) => {
    setFormData((prev) => ({ ...prev, clienteId, obraId: '', cargaId: '' }));
    setCargas([]);
    
    if (clienteId) {
      carregarObrasPorCliente(Number(clienteId));
    } else {
      setObras([]);
    }
    
    if (errors.clienteId) {
      setErrors((prev) => ({ ...prev, clienteId: '' }));
    }
  };

  const handleObraChange = (obraId: string) => {
    setFormData((prev) => ({ ...prev, obraId, cargaId: '' }));
    
    if (obraId) {
      carregarCargasPorObra(Number(obraId));
    } else {
      setCargas([]);
    }
    
    if (errors.obraId) {
      setErrors((prev) => ({ ...prev, obraId: '' }));
    }
  };

  const handleIdadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const idadeId = Number(value);
    
    setFormData((prev) => {
      if (checked) {
        return {
          ...prev,
          idadesEscolhidasIds: [...prev.idadesEscolhidasIds, idadeId]
        };
      } else {
        return {
          ...prev,
          idadesEscolhidasIds: prev.idadesEscolhidasIds.filter(id => id !== idadeId)
        };
      }
    });
    
    if (errors.idadesEscolhidasIds) {
      setErrors((prev) => ({ ...prev, idadesEscolhidasIds: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.idAmostra.trim()) {
      newErrors.idAmostra = 'ID da Amostra é obrigatório';
    }
    
    if (!formData.dataRetirada) {
      newErrors.dataRetirada = 'Data de retirada é obrigatória';
    }
    
    if (!formData.cargaId) {
      newErrors.cargaId = 'Carga de concreto é obrigatória';
    }
    
    if (!formData.resistenciaProjetoId) {
      newErrors.resistenciaProjetoId = 'Classe de resistência é obrigatória';
    }
    
    if (formData.idadesEscolhidasIds.length === 0) {
      newErrors.idadesEscolhidasIds = 'Selecione pelo menos uma idade de CP';
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
      const cargaSelecionada = cargas.find(c => c.id === Number(formData.cargaId));
      const resistenciaSelecionada = classesResistencia.find(c => c.id === Number(formData.resistenciaProjetoId));
      const idadesSelecionadas = idadesCP.filter(i => formData.idadesEscolhidasIds.includes(i.id));
      
      if (!cargaSelecionada || !resistenciaSelecionada || idadesSelecionadas.length === 0) {
        console.error('Dados inválidos');
        return;
      }
      
      const amostraData = {
        idAmostra: formData.idAmostra,
        dataRetirada: formData.dataRetirada,
        carga: cargaSelecionada,
        resistenciaProjeto: resistenciaSelecionada,
        idadesEscolhidas: idadesSelecionadas
      };
      
      if (editingId) {
        await amostraService.atualizarAmostra(editingId, amostraData);
      } else {
        await amostraService.criarAmostra(amostraData);
      }
      
      resetForm();
      carregarDados();
    } catch (error) {
      console.error('Erro ao salvar amostra:', error);
    }
  };

  const handleEdit = (amostra: Amostra) => {
    setFormData({
      idAmostra: amostra.idAmostra,
      dataRetirada: amostra.dataRetirada,
      cargaId: amostra.carga.id,
      resistenciaProjetoId: amostra.resistenciaProjeto.id,
      idadesEscolhidasIds: amostra.idadesEscolhidas.map(i => i.id),
      clienteId: amostra.carga.obra.cliente.id,
      obraId: amostra.carga.obra.id
    });
    
    carregarObrasPorCliente(amostra.carga.obra.cliente.id);
    carregarCargasPorObra(amostra.carga.obra.id);
    setEditingId(amostra.id);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta amostra?')) {
      try {
        await amostraService.deletarAmostra(id);
        carregarDados();
      } catch (error) {
        console.error('Erro ao excluir amostra:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      idAmostra: '',
      dataRetirada: '',
      cargaId: '',
      resistenciaProjetoId: '',
      idadesEscolhidasIds: [],
      clienteId: '',
      obraId: ''
    });
    setEditingId(null);
    setErrors({});
  };

  const filteredAmostras = amostras.filter(amostra => 
    amostra.idAmostra.toLowerCase().includes(searchTerm.toLowerCase()) ||
    amostra.carga.obra.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    amostra.resistenciaProjeto.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatarData = (dataString: string) => {
    if (!dataString) return '-';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <label htmlFor="idAmostra">ID da Amostra *</label>
            <input
              type="text"
              id="idAmostra"
              name="idAmostra"
              value={formData.idAmostra}
              onChange={handleInputChange}
            />
            {errors.idAmostra && <span className="error-message">{errors.idAmostra}</span>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="dataRetirada">Data de Retirada *</label>
            <input
              type="date"
              id="dataRetirada"
              name="dataRetirada"
              value={formData.dataRetirada}
              onChange={handleInputChange}
            />
            {errors.dataRetirada && <span className="error-message">{errors.dataRetirada}</span>}
          </FormGroup>
        </FormRow>
        
        <FormRow>
          <FormGroup>
            <label htmlFor="clienteId">Cliente *</label>
            <select
              id="clienteId"
              name="clienteId"
              value={formData.clienteId}
              onChange={(e) => handleClienteChange(e.target.value)}
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
          
          <FormGroup>
            <label htmlFor="obraId">Obra *</label>
            <select
              id="obraId"
              name="obraId"
              value={formData.obraId}
              onChange={(e) => handleObraChange(e.target.value)}
              disabled={!formData.clienteId || obras.length === 0}
            >
              <option value="">Selecione uma obra</option>
              {obras.map((obra) => (
                <option key={obra.id} value={obra.id}>
                  {obra.nome}
                </option>
              ))}
            </select>
            {errors.obraId && <span className="error-message">{errors.obraId}</span>}
          </FormGroup>
        </FormRow>
        
        <FormRow>
          <FormGroup>
            <label htmlFor="cargaId">Carga de Concreto *</label>
            <select
              id="cargaId"
              name="cargaId"
              value={formData.cargaId}
              onChange={handleInputChange}
              disabled={!formData.obraId || cargas.length === 0}
            >
              <option value="">Selecione uma carga</option>
              {cargas.map((carga) => (
                <option key={carga.id} value={carga.id}>
                  {carga.notaFiscal} - {formatarData(carga.dataHoraChegada)}
                </option>
              ))}
            </select>
            {errors.cargaId && <span className="error-message">{errors.cargaId}</span>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="resistenciaProjetoId">Classe de Resistência *</label>
            <select
              id="resistenciaProjetoId"
              name="resistenciaProjetoId"
              value={formData.resistenciaProjetoId}
              onChange={handleInputChange}
            >
              <option value="">Selecione uma classe</option>
              {classesResistencia.map((classe) => (
                <option key={classe.id} value={classe.id}>
                  {classe.nome}
                </option>
              ))}
            </select>
            {errors.resistenciaProjetoId && <span className="error-message">{errors.resistenciaProjetoId}</span>}
          </FormGroup>
        </FormRow>
        
        <FormGroup>
          <label>Idades de CP para Ensaio *</label>
          <div className="checkbox-group">
            {idadesCP.map((idade) => (
              <div key={idade.id} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`idade-${idade.id}`}
                  name="idadesEscolhidasIds"
                  value={idade.id}
                  checked={formData.idadesEscolhidasIds.includes(idade.id)}
                  onChange={handleIdadeChange}
                />
                <label htmlFor={`idade-${idade.id}`}>{idade.idade} dias</label>
              </div>
            ))}
          </div>
          {errors.idadesEscolhidasIds && <span className="error-message">{errors.idadesEscolhidasIds}</span>}
        </FormGroup>
        
        <FormActions>
          <button type="button" className="cancel-button" onClick={resetForm}>
            Cancelar
          </button>
          <button type="submit" className="save-button">
            {editingId ? 'Atualizar' : 'Salvar'} Amostra
          </button>
        </FormActions>
      </form>
      
      <ListContainer>
        <div className="list-header">
          <h2>Amostras Cadastradas</h2>
          <div className="search-container">
            <Search size={16} />
            <input
              type="text"
              placeholder="Buscar amostra..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {loading ? (
          <div className="loading">Carregando amostras...</div>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>ID Amostra</th>
                <th>Data Retirada</th>
                <th>Obra</th>
                <th>Carga</th>
                <th>Classe</th>
                <th>Idades CP</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredAmostras.length > 0 ? (
                filteredAmostras.map((amostra) => (
                  <tr key={amostra.id}>
                    <td>{amostra.idAmostra}</td>
                    <td>{formatarData(amostra.dataRetirada)}</td>
                    <td>{amostra.carga.obra.nome}</td>
                    <td>{amostra.carga.notaFiscal}</td>
                    <td>{amostra.resistenciaProjeto.nome}</td>
                    <td>
                      {amostra.idadesEscolhidas.map(i => i.idade).join(', ')} dias
                    </td>
                    <td>
                      <button
                        type="button"
                        className="action-icon"
                        onClick={() => handleEdit(amostra)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        type="button"
                        className="action-icon delete"
                        onClick={() => handleDelete(amostra.id)}
                      >
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="no-data">
                    Nenhuma amostra encontrada
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

export default AmostraForm;
