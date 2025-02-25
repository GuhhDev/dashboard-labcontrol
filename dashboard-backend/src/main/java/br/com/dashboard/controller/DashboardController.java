package br.com.dashboard.controller;

import br.com.dashboard.dto.DashboardStatsDTO;
import br.com.dashboard.dto.EnsaiosPorStatusDTO;
import br.com.dashboard.dto.ResultadosPorPeriodoDTO;
import br.com.dashboard.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    public DashboardStatsDTO getStats() {
        return dashboardService.getStats();
    }

    @GetMapping("/ensaios-por-status")
    public List<EnsaiosPorStatusDTO> getEnsaiosPorStatus() {
        return dashboardService.getEnsaiosPorStatus();
    }

    @GetMapping("/resultados-por-periodo")
    public List<ResultadosPorPeriodoDTO> getResultadosPorPeriodo(
            @RequestParam(defaultValue = "mes") String periodo) {
        return dashboardService.getResultadosPorPeriodo(periodo);
    }
}
