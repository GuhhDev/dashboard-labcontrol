import { useState, useEffect } from 'react';
import { Container, Header, Content, FilterSection, ReportList, ReportCard, ActionButton } from './styles';
import relatorioService, { Relatorio, RelatorioFiltros } from '../../services/relatorioService';
import clienteService, { Cliente } from '../../services/clienteService';
import obraService, { Obra } from '../../services/obraService';
import cargaConcretoService from '../../services/cargaConcretoService';
import { FileText, Download, Filter, RefreshCw, Plus } from 'lucide-react';

const RelatoriosPage = () => {
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [loading, setLoading] = useState(true);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [obras, setObras] = useState<Obra[]>([]);
  const [classesResistencia, setClassesResistencia] = useState<any[]>([]);
  const [filtros, setFiltros] = useState<RelatorioFiltros>({
    dataInicio: '',
    dataFim: '',
    clienteId: undefined,
    obraId: undefined,
    classeResistenciaId: undefined,
    tipoRelatorio: 'AMOSTRAS'
  });
  const [gerandoRelatorio, setGerandoRelatorio] = useState(false);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [relatoriosData, clientesData, classesResistenciaData] = await Promise.all([
        relatorioService.listarRelatorios(),
        clienteService.listarClientes(),
        cargaConcretoService.listarClassesResistencia()
      ]);
      
      setRelatorios(relatoriosData);
      setClientes(clientesData);
      setClassesResistencia(classesResistenciaData);
      
      if (clientesData.length > 0 && filtros.clienteId) {
        carregarObrasPorCliente(filtros.clienteId);
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

  const handleClienteChange = (clienteId: number | undefined) => {
    setFiltros({ ...filtros, clienteId, obraId: undefined });
    if (clienteId) {
      carregarObrasPorCliente(clienteId);
    } else {
      setObras([]);
    }
  };

  const aplicarFiltros = () => {
    carregarDados();
  };

  const limparFiltros = () => {
    setFiltros({
      dataInicio: '',
      dataFim: '',
      clienteId: undefined,
      obraId: undefined,
      classeResistenciaId: undefined,
      tipoRelatorio: 'AMOSTRAS'
    });
    setObras([]);
  };

  const gerarRelatorio = async () => {
    setGerandoRelatorio(true);
    try {
      const resultado = await relatorioService.gerarRelatorio(filtros);
      // Após gerar o relatório, atualiza a lista
      carregarDados();
      // Opcionalmente, pode-se abrir o relatório em uma nova aba
      window.open(resultado.url, '_blank');
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
    } finally {
      setGerandoRelatorio(false);
    }
  };

  const downloadRelatorio = async (id: number) => {
    try {
      const blob = await relatorioService.downloadRelatorio(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `relatorio-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Erro ao baixar relatório:', error);
    }
  };

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR') + ' ' + data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Container>
      <Header>
        <h1>Relatórios</h1>
        <ActionButton onClick={gerarRelatorio} disabled={gerandoRelatorio}>
          <Plus size={16} />
          {gerandoRelatorio ? 'Gerando...' : 'Gerar Relatório'}
        </ActionButton>
      </Header>

      <FilterSection>
        <div className="filter-group">
          <label>Data Início:</label>
          <input
            type="date"
            value={filtros.dataInicio}
            onChange={(e) => setFiltros({ ...filtros, dataInicio: e.target.value })}
          />
        </div>

        <div className="filter-group">
          <label>Data Fim:</label>
          <input
            type="date"
            value={filtros.dataFim}
            onChange={(e) => setFiltros({ ...filtros, dataFim: e.target.value })}
          />
        </div>

        <div className="filter-group">
          <label>Cliente:</label>
          <select
            value={filtros.clienteId || ''}
            onChange={(e) => handleClienteChange(e.target.value ? Number(e.target.value) : undefined)}
          >
            <option value="">Todos</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Obra:</label>
          <select
            value={filtros.obraId || ''}
            onChange={(e) => setFiltros({ ...filtros, obraId: e.target.value ? Number(e.target.value) : undefined })}
            disabled={!filtros.clienteId || obras.length === 0}
          >
            <option value="">Todas</option>
            {obras.map((obra) => (
              <option key={obra.id} value={obra.id}>
                {obra.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Classe de Resistência:</label>
          <select
            value={filtros.classeResistenciaId || ''}
            onChange={(e) => setFiltros({ ...filtros, classeResistenciaId: e.target.value ? Number(e.target.value) : undefined })}
          >
            <option value="">Todas</option>
            {classesResistencia.map((classe) => (
              <option key={classe.id} value={classe.id}>
                {classe.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Tipo de Relatório:</label>
          <select
            value={filtros.tipoRelatorio}
            onChange={(e) => setFiltros({ ...filtros, tipoRelatorio: e.target.value as any })}
          >
            <option value="AMOSTRAS">Amostras</option>
            <option value="ENSAIOS">Ensaios</option>
            <option value="NAO_CONFORMIDADES">Não Conformidades</option>
            <option value="DESEMPENHO">Desempenho</option>
          </select>
        </div>

        <div className="filter-actions">
          <button onClick={aplicarFiltros} className="filter-button">
            <Filter size={16} />
            Filtrar
          </button>
          <button onClick={limparFiltros} className="clear-button">
            <RefreshCw size={16} />
            Limpar
          </button>
        </div>
      </FilterSection>

      <Content>
        {loading ? (
          <div className="loading">Carregando relatórios...</div>
        ) : (
          <ReportList>
            {relatorios.length > 0 ? (
              relatorios.map((relatorio) => (
                <ReportCard key={relatorio.id}>
                  <div className="report-icon">
                    <FileText size={24} />
                  </div>
                  <div className="report-info">
                    <h3>{relatorio.titulo}</h3>
                    <p className="report-type">{relatorio.tipo}</p>
                    <p className="report-date">Gerado em: {formatarData(relatorio.dataGeracao)}</p>
                  </div>
                  <button
                    className="download-button"
                    onClick={() => downloadRelatorio(relatorio.id)}
                  >
                    <Download size={18} />
                    Download
                  </button>
                </ReportCard>
              ))
            ) : (
              <div className="no-data">Nenhum relatório encontrado</div>
            )}
          </ReportList>
        )}
      </Content>
    </Container>
  );
};

export default RelatoriosPage;
