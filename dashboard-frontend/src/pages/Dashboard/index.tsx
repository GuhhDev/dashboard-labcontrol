import React, { useEffect, useState } from 'react';
import { Container, Header, Title, CardsGrid, ChartContainer, TableContainer } from './styles';
import Card from '../../components/Card';
import * as Icons from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import dashboardService, { DashboardStats, ResultadosPorPeriodo } from '../../services/dashboardService';

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalAmostras: 0,
    ensaiosAgendados: 0,
    ensaiosRealizados: 0,
    ensaiosAtrasados: 0,
    ensaiosARealizarHoje: 0
  });
  const [resultados, setResultados] = useState<ResultadosPorPeriodo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, resultadosData] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getResultadosPorPeriodo('mes')
        ]);
        
        setStats(statsData);
        setResultados(resultadosData);
      } catch (err) {
        console.error('Erro ao carregar dados do dashboard:', err);
        setError('Erro ao carregar dados do dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <Container>Carregando...</Container>;
  }

  if (error) {
    return <Container>Erro: {error}</Container>;
  }

  return (
    <Container>
      <Header>
        <Title>Dashboard - Controle de Qualidade</Title>
      </Header>

      <CardsGrid>
        <Card 
          title="Total de Amostras" 
          value={stats.totalAmostras.toString()}
          icon={<Icons.Database size={20} color="#4C51BF" />}
        />
        <Card 
          title="Ensaios Agendados" 
          value={stats.ensaiosAgendados.toString()}
          icon={<Icons.Calendar size={20} color="#ED8936" />}
        />
        <Card 
          title="Para Realizar Hoje" 
          value={stats.ensaiosARealizarHoje.toString()}
          icon={<Icons.AlertCircle size={20} color="#48BB78" />}
        />
        <Card 
          title="Ensaios Atrasados" 
          value={stats.ensaiosAtrasados.toString()}
          icon={<Icons.AlertTriangle size={20} color="#E53E3E" />}
        />
      </CardsGrid>

      <ChartContainer>
        <h3>Resultados por Período</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={resultados}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="periodo" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              name="Dentro do Esperado" 
              dataKey="dentroEsperado" 
              stroke="#48BB78" 
            />
            <Line 
              type="monotone" 
              name="Muito Baixo" 
              dataKey="muitoBaixo" 
              stroke="#E53E3E" 
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      <TableContainer>
        <h3>Amostras Pendentes</h3>
        {/* Add table component here */}
      </TableContainer>
    </Container>
  );
};

export default Dashboard;