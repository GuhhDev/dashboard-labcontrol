package br.com.dashboard.dto;

import lombok.Data;

@Data
public class DashboardStatsDTO {
    private long totalAmostras;
    private long ensaiosAgendados;
    private long ensaiosRealizados;
    private long ensaiosAtrasados;
    private long ensaiosARealizarHoje;
}
