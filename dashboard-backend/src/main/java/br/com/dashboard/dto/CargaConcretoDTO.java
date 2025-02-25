package br.com.dashboard.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class CargaConcretoDTO {
    private Long id;
    private String numeroCarga;
    private LocalDateTime data;
    private String numeroNF;
    private Double volumeConcreto;
    private LocalDateTime horarioChegada;
    private LocalDateTime horarioSaida;
    private String slump;
    private String motorista;
    private String caminhao;
    private String localPecaConcretada;
    private String etiquetasPecas;
    private String registroProjeto;
    private List<String> fotosUrls;
    private InformacaoCarregamentoDTO informacaoCarregamento;
    private Long concreteiraId;
    private Long resistenciaId;
    private Long obraId;
    private List<Long> amostrasIds;
}
