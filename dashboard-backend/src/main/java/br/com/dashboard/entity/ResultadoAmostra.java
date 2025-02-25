package br.com.dashboard.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class ResultadoAmostra {
    @Id @GeneratedValue
    private Long id;

    private String idAmostra;
    private Double resistenciaProjeto;
    private Double resistenciaEnsaio;
    private Double desvioPadrao;
    private Double coeficienteVariacao;

    @ManyToOne
    private Relatorio relatorio;
}