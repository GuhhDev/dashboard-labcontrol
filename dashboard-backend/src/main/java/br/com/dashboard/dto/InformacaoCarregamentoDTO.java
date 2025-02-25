package br.com.dashboard.dto;

import lombok.Data;

@Data
public class InformacaoCarregamentoDTO {
    private Long id;
    private Double quantidadeCimento;
    private Double quantidadeAreia;
    private Double quantidadeBrita0;
    private Double quantidadeBrita1;
    private Double quantidadeAgua;
    private Double quantidadeAditivos;
    private Double fatorAguaCimento;
}
