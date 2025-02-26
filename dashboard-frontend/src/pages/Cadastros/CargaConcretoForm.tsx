import { useState, useEffect } from 'react';
import { FormGroup, FormRow, FormActions, ListContainer, Table } from './styles';
import cargaConcretoService, { CargaConcreto, ClasseResistencia, Concreteira } from '../../services/cargaConcretoService';
import obraService, { Obra } from '../../services/obraService';
import clienteService, { Cliente } from '../../services/clienteService';
import { Search, Edit, Trash } from 'lucide-react';

const CargaConcretoForm = () => {
  const [cargas, setCargas] = useState<CargaConcreto[]>([]);
  const [obras, setObras] = useState<Obra[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [classesResistencia, setClassesResistencia] = useState<ClasseResistencia[]>([]);
  const [concreteiras, setConcreteiras] = useState<Concreteira[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<{
    notaFiscal: string;
    dataHoraChegada: string;
    dataHoraDescarregamento: string;
    placa: string;
    classeResistenciaId: number | '';
    concreiteiraId: number | '';
    clienteId: number | '';
    obraId: number | '';
    volumeConcreto: string;
    slump: string;
    motorista: string;
    localPecaConcretada: string;
    etiquetasPecas: string;
    registroProjeto: string;
    observacoes: string;
  }>({
    notaFiscal: '',
    dataHoraChegada: '',
    dataHoraDescarregamento: '',
    placa: '',
    classeResistenciaId: '',
    concreiteiraId: '',
    clienteId: '',
    obraId: '',
    volumeConcreto: '',
    slump: '',
    motorista: '',
    localPecaConcretada: '',
    etiquetasPecas: '',
    registroProjeto: '',
    observacoes: ''
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
        cargasData,
        clientesData,
        classesResistenciaData,
        concreteirasData
      ] = await Promise.all([
        cargaConcretoService.listarCargas(),
        clienteService.listarClientes(),
        cargaConcretoService.listarClassesResistencia(),
        cargaConcretoService.listarConcreteiras()
      ]);
      
      setCargas(cargasData);
      setClientes(clientesData);
      setClassesResistencia(classesResistenciaData);
      setConcreteiras(concreteirasData);
      
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
    } catch (error) {
      console.error('Erro ao carregar obras:', error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Limpa o erro do campo quando o usuário digita
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleClienteChange = (clienteId: string) => {
    setFormData((prev) => ({ ...prev, clienteId, obraId: '' }));
    
    if (clienteId) {
      carregarObrasPorCliente(Number(clienteId));
    } else {
      setObras([]);
    }
    
    if (errors.clienteId) {
      setErrors((prev) => ({ ...prev, clienteId: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.notaFiscal.trim()) {
      newErrors.notaFiscal = 'Nota Fiscal é obrigatória';
    }
    
    if (!formData.dataHoraChegada) {
      newErrors.dataHoraChegada = 'Data e hora de chegada são obrigatórias';
    }
    
    if (!formData.classeResistenciaId) {
      newErrors.classeResistenciaId = 'Classe de Resistência é obrigatória';
    }
    
    if (!formData.concreiteiraId) {
      newErrors.concreiteiraId = 'Concreteira é obrigatória';
    }
    
    if (!formData.clienteId) {
      newErrors.clienteId = 'Cliente é obrigatório';
    }
    
    if (!formData.obraId) {
      newErrors.obraId = 'Obra é obrigatória';
    }
    
    if (formData.volumeConcreto && isNaN(Number(formData.volumeConcreto))) {
      newErrors.volumeConcreto = 'Volume deve ser um número válido';
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
      const classeResistenciaSelecionada = classesResistencia.find(c => c.id === Number(formData.classeResistenciaId));
      const concreteiraSelecionada = concreteiras.find(c => c.id === Number(formData.concreiteiraId));
      const obraSelecionada = obras.find(o => o.id === Number(formData.obraId));
      
      if (!classeResistenciaSelecionada || !concreteiraSelecionada || !obraSelecionada) {
        console.error('Dados inválidos');
        return;
      }
      
      const cargaData = {
        notaFiscal: formData.notaFiscal,
        dataHoraChegada: formData.dataHoraChegada,
        dataHoraDescarregamento: formData.dataHoraDescarregamento || undefined,
        placa: formData.placa || undefined,
        classeResistencia: classeResistenciaSelecionada,
        concreteira: concreteiraSelecionada,
        obra: obraSelecionada,
        volumeConcreto: formData.volumeConcreto ? Number(formData.volumeConcreto) : undefined,
        slump: formData.slump || undefined,
        motorista: formData.motorista || undefined,
        localPecaConcretada: formData.localPecaConcretada || undefined,
        etiquetasPecas: formData.etiquetasPecas || undefined,
        registroProjeto: formData.registroProjeto || undefined,
        observacoes: formData.observacoes || undefined
      };
      
      if (editingId) {
        await cargaConcretoService.atualizarCarga(editingId, cargaData);
      } else {
        await cargaConcretoService.criarCarga(cargaData);
      }
      
      resetForm();
      carregarDados();
    } catch (error) {
      console.error('Erro ao salvar carga de concreto:', error);
    }
  };

  const handleEdit = (carga: CargaConcreto) => {
    setFormData({
      notaFiscal: carga.notaFiscal,
      dataHoraChegada: carga.dataHoraChegada,
      dataHoraDescarregamento: carga.dataHoraDescarregamento || '',
      placa: carga.placa || '',
      classeResistenciaId: carga.classeResistencia.id,
      concreiteiraId: carga.concreteira.id,
      clienteId: carga.obra.cliente.id,
      obraId: carga.obra.id,
      volumeConcreto: carga.volumeConcreto ? carga.volumeConcreto.toString() : '',
      slump: carga.slump || '',
      motorista: carga.motorista || '',
      localPecaConcretada: carga.localPecaConcretada || '',
      etiquetasPecas: carga.etiquetasPecas || '',
      registroProjeto: carga.registroProjeto || '',
      observacoes: carga.observacoes || ''
    });
    
    carregarObrasPorCliente(carga.obra.cliente.id);
    setEditingId(carga.id);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta carga de concreto?')) {
      try {
        await cargaConcretoService.deletarCarga(id);
        carregarDados();
      } catch (error) {
        console.error('Erro ao excluir carga de concreto:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      notaFiscal: '',
      dataHoraChegada: '',
      dataHoraDescarregamento: '',
      placa: '',
      classeResistenciaId: '',
      concreiteiraId: '',
      clienteId: '',
      obraId: '',
      volumeConcreto: '',
      slump: '',
      motorista: '',
      localPecaConcretada: '',
      etiquetasPecas: '',
      registroProjeto: '',
      observacoes: ''
    });
    setEditingId(null);
    setErrors({});
  };

  const filteredCargas = cargas.filter(carga => 
    carga.notaFiscal.toLowerCase().includes(searchTerm.toLowerCase()) ||
    carga.obra.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    carga.concreteira.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    carga.classeResistencia.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatarData = (dataString: string) => {
    if (!dataString) return '-';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR') + ' ' + data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <label htmlFor="notaFiscal">Nota Fiscal *</label>
            <input
              type="text"
              id="notaFiscal"
              name="notaFiscal"
              value={formData.notaFiscal}
              onChange={handleInputChange}
            />
            {errors.notaFiscal && <span className="error-message">{errors.notaFiscal}</span>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="dataHoraChegada">Data/Hora de Chegada *</label>
            <input
              type="datetime-local"
              id="dataHoraChegada"
              name="dataHoraChegada"
              value={formData.dataHoraChegada}
              onChange={handleInputChange}
            />
            {errors.dataHoraChegada && <span className="error-message">{errors.dataHoraChegada}</span>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="dataHoraDescarregamento">Data/Hora de Descarregamento</label>
            <input
              type="datetime-local"
              id="dataHoraDescarregamento"
              name="dataHoraDescarregamento"
              value={formData.dataHoraDescarregamento}
              onChange={handleInputChange}
            />
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
              onChange={handleInputChange}
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
            <label htmlFor="classeResistenciaId">Classe de Resistência *</label>
            <select
              id="classeResistenciaId"
              name="classeResistenciaId"
              value={formData.classeResistenciaId}
              onChange={handleInputChange}
            >
              <option value="">Selecione uma classe</option>
              {classesResistencia.map((classe) => (
                <option key={classe.id} value={classe.id}>
                  {classe.nome}
                </option>
              ))}
            </select>
            {errors.classeResistenciaId && <span className="error-message">{errors.classeResistenciaId}</span>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="concreiteiraId">Concreteira *</label>
            <select
              id="concreiteiraId"
              name="concreiteiraId"
              value={formData.concreiteiraId}
              onChange={handleInputChange}
            >
              <option value="">Selecione uma concreteira</option>
              {concreteiras.map((concreteira) => (
                <option key={concreteira.id} value={concreteira.id}>
                  {concreteira.nome}
                </option>
              ))}
            </select>
            {errors.concreiteiraId && <span className="error-message">{errors.concreiteiraId}</span>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="placa">Placa do Caminhão</label>
            <input
              type="text"
              id="placa"
              name="placa"
              value={formData.placa}
              onChange={handleInputChange}
            />
          </FormGroup>
        </FormRow>
        
        <FormRow>
          <FormGroup>
            <label htmlFor="volumeConcreto">Volume (m³)</label>
            <input
              type="number"
              id="volumeConcreto"
              name="volumeConcreto"
              value={formData.volumeConcreto}
              onChange={handleInputChange}
              step="0.01"
              min="0"
            />
            {errors.volumeConcreto && <span className="error-message">{errors.volumeConcreto}</span>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="slump">Slump</label>
            <input
              type="text"
              id="slump"
              name="slump"
              value={formData.slump}
              onChange={handleInputChange}
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="motorista">Motorista</label>
            <input
              type="text"
              id="motorista"
              name="motorista"
              value={formData.motorista}
              onChange={handleInputChange}
            />
          </FormGroup>
        </FormRow>
        
        <FormGroup>
          <label htmlFor="localPecaConcretada">Local da Peça Concretada</label>
          <input
            type="text"
            id="localPecaConcretada"
            name="localPecaConcretada"
            value={formData.localPecaConcretada}
            onChange={handleInputChange}
          />
        </FormGroup>
        
        <FormRow>
          <FormGroup>
            <label htmlFor="etiquetasPecas">Etiquetas das Peças</label>
            <input
              type="text"
              id="etiquetasPecas"
              name="etiquetasPecas"
              value={formData.etiquetasPecas}
              onChange={handleInputChange}
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="registroProjeto">Registro do Projeto</label>
            <input
              type="text"
              id="registroProjeto"
              name="registroProjeto"
              value={formData.registroProjeto}
              onChange={handleInputChange}
            />
          </FormGroup>
        </FormRow>
        
        <FormGroup>
          <label htmlFor="observacoes">Observações</label>
          <textarea
            id="observacoes"
            name="observacoes"
            value={formData.observacoes}
            onChange={handleInputChange}
          />
        </FormGroup>
        
        <FormActions>
          <button type="button" className="cancel-button" onClick={resetForm}>
            Cancelar
          </button>
          <button type="submit" className="save-button">
            {editingId ? 'Atualizar' : 'Salvar'} Carga de Concreto
          </button>
        </FormActions>
      </form>
      
      <ListContainer>
        <div className="list-header">
          <h2>Cargas de Concreto Cadastradas</h2>
          <div className="search-container">
            <Search size={16} />
            <input
              type="text"
              placeholder="Buscar carga de concreto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {loading ? (
          <div className="loading">Carregando cargas de concreto...</div>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Nota Fiscal</th>
                <th>Data/Hora</th>
                <th>Obra</th>
                <th>Classe</th>
                <th>Concreteira</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredCargas.length > 0 ? (
                filteredCargas.map((carga) => (
                  <tr key={carga.id}>
                    <td>{carga.notaFiscal}</td>
                    <td>{formatarData(carga.dataHoraChegada)}</td>
                    <td>{carga.obra.nome}</td>
                    <td>{carga.classeResistencia.nome}</td>
                    <td>{carga.concreteira.nome}</td>
                    <td>
                      <button
                        type="button"
                        className="action-icon"
                        onClick={() => handleEdit(carga)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        type="button"
                        className="action-icon delete"
                        onClick={() => handleDelete(carga.id)}
                      >
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="no-data">
                    Nenhuma carga de concreto encontrada
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

export default CargaConcretoForm;
