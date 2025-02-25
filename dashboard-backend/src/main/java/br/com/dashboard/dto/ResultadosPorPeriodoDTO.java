package br.com.dashboard.dto;

import lombok.Data;

@Data
public class ResultadosPorPeriodoDTO {
    private String periodo;
    private long dentroEsperado;
    private long muitoBaixo;
}
