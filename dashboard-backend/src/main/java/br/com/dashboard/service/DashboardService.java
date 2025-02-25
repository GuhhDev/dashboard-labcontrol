package br.com.dashboard.service;

import br.com.dashboard.dto.DashboardStatsDTO;
import br.com.dashboard.dto.EnsaiosPorStatusDTO;
import br.com.dashboard.dto.ResultadosPorPeriodoDTO;
import br.com.dashboard.entity.Ensaio;
import br.com.dashboard.enums.ResultadoEnsaio;
import br.com.dashboard.enums.StatusEnsaio;
import br.com.dashboard.repository.AmostraRepository;
import br.com.dashboard.repository.EnsaioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final AmostraRepository amostraRepository;
    private final EnsaioRepository ensaioRepository;

    public DashboardStatsDTO getStats() {
        DashboardStatsDTO stats = new DashboardStatsDTO();
        
        stats.setTotalAmostras(amostraRepository.count());
        stats.setEnsaiosAgendados(ensaioRepository.countByStatus(StatusEnsaio.AGENDADO));
        stats.setEnsaiosRealizados(ensaioRepository.countByStatus(StatusEnsaio.REALIZADO));
        stats.setEnsaiosAtrasados(ensaioRepository.countByStatus(StatusEnsaio.ATRASADO));
        stats.setEnsaiosARealizarHoje(ensaioRepository.countByStatusAndDataEnsaio(StatusEnsaio.A_REALIZAR, LocalDate.now()));
        
        return stats;
    }

    public List<EnsaiosPorStatusDTO> getEnsaiosPorStatus() {
        return ensaioRepository.countByStatusGroupByStatus().stream()
            .map(result -> {
                EnsaiosPorStatusDTO dto = new EnsaiosPorStatusDTO();
                dto.setStatus(result.getStatus().name());
                dto.setQuantidade(result.getQuantidade());
                return dto;
            })
            .collect(Collectors.toList());
    }

    public List<ResultadosPorPeriodoDTO> getResultadosPorPeriodo(String periodo) {
        LocalDate dataInicial;
        LocalDate dataFinal = LocalDate.now();

        switch (periodo.toLowerCase()) {
            case "dia":
                dataInicial = dataFinal.minusDays(7);
                break;
            case "semana":
                dataInicial = dataFinal.minusWeeks(4);
                break;
            default: // mes
                dataInicial = dataFinal.minusMonths(6);
                break;
        }

        List<Ensaio> ensaios = ensaioRepository.findByDataEnsaioBetweenAndStatus(
            dataInicial, dataFinal, StatusEnsaio.REALIZADO);

        return ensaios.stream()
            .collect(Collectors.groupingBy(
                ensaio -> ensaio.getDataEnsaio().toString(),
                Collectors.groupingBy(
                    Ensaio::getResultadoAvaliacao,
                    Collectors.counting()
                )
            ))
            .entrySet().stream()
            .map(entry -> {
                ResultadosPorPeriodoDTO dto = new ResultadosPorPeriodoDTO();
                dto.setPeriodo(entry.getKey());
                dto.setDentroEsperado(entry.getValue().getOrDefault(ResultadoEnsaio.DENTRO_ESPERADO, 0L));
                dto.setMuitoBaixo(entry.getValue().getOrDefault(ResultadoEnsaio.MUITO_BAIXO, 0L));
                return dto;
            })
            .collect(Collectors.toList());
    }
}
