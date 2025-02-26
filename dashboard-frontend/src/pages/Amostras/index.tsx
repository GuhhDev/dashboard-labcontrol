import { useState, useEffect } from 'react';
import { Container, Header, Content, Table, FilterSection, ActionButton, StatusBadge, Pagination } from './styles';
import amostraService, { Amostra } from '../../services/amostraService';
import { Search, Filter, Plus, FileDown, RefreshCw } from 'lucide-react';

const AmostrasPage: React.FC = () => {
  const [amostras, setAmostras] = useState<Amostra[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [filtros, setFiltros] = useState({
    dataInicio: '',
    dataFim: '',
    status: ''
  });

  useEffect(() => {
    carregarAmostras();
  }, [page]);

  const carregarAmostras = async () => {
    setLoading(true);
    try {
      const response = await amostraService.listarAmostras({
        page,
        size,
        ...filtros
      });
      setAmostras(response.content);
      setTotalElements(response.totalElements);
    } catch (error) {
      console.error('Erro ao carregar amostras:', error);
    } finally {
      setLoading(false);
    }
  };

  const aplicarFiltros = () => {
    setPage(0);
    carregarAmostras();
  };

  const limparFiltros = () => {
    setFiltros({
      dataInicio: '',
      dataFim: '',
      status: ''
    });
    setPage(0);
    carregarAmostras();
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AGENDADO':
        return 'blue';
      case 'A_REALIZAR':
        return 'orange';
      case 'REALIZADO':
        return 'green';
      case 'ATRASADO':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <Container>
      <Header>
        <h1>Amostras</h1>
        <ActionButton>
          <Plus size={16} />
          Nova Amostra
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
          <label>Status:</label>
          <select
            value={filtros.status}
            onChange={(e) => setFiltros({ ...filtros, status: e.target.value })}
          >
            <option value="">Todos</option>
            <option value="AGENDADO">Agendado</option>
            <option value="A_REALIZAR">A Realizar</option>
            <option value="REALIZADO">Realizado</option>
            <option value="ATRASADO">Atrasado</option>
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
          <div className="loading">Carregando amostras...</div>
        ) : (
          <>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Data Retirada</th>
                  <th>Carga</th>
                  <th>Obra</th>
                  <th>Classe Resistência</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {amostras.length > 0 ? (
                  amostras.map((amostra) => (
                    <tr key={amostra.id}>
                      <td>{amostra.idAmostra}</td>
                      <td>{new Date(amostra.dataRetirada).toLocaleDateString('pt-BR')}</td>
                      <td>{amostra.carga.numeroCarga}</td>
                      <td>{amostra.carga.localPecaConcretada || '-'}</td>
                      <td>{amostra.resistenciaProjeto.nome}</td>
                      <td>
                        <StatusBadge color={getStatusColor(amostra.ensaios[0]?.status || 'AGENDADO')}>
                          {amostra.ensaios[0]?.status === 'AGENDADO'
                            ? 'Agendado'
                            : amostra.ensaios[0]?.status === 'A_REALIZAR'
                            ? 'A Realizar'
                            : amostra.ensaios[0]?.status === 'REALIZADO'
                            ? 'Realizado'
                            : amostra.ensaios[0]?.status === 'ATRASADO'
                            ? 'Atrasado'
                            : 'Sem ensaio'}
                        </StatusBadge>
                      </td>
                      <td>
                        <button className="action-icon">
                          <Search size={18} />
                        </button>
                        <button className="action-icon">
                          <FileDown size={18} />
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

            <Pagination>
              <button
                disabled={page === 0}
                onClick={() => handlePageChange(page - 1)}
                className="pagination-button"
              >
                Anterior
              </button>
              <span className="pagination-info">
                Página {page + 1} de {Math.ceil(totalElements / size)}
              </span>
              <button
                disabled={page >= Math.ceil(totalElements / size) - 1}
                onClick={() => handlePageChange(page + 1)}
                className="pagination-button"
              >
                Próxima
              </button>
            </Pagination>
          </>
        )}
      </Content>
    </Container>
  );
};

export default AmostrasPage;
