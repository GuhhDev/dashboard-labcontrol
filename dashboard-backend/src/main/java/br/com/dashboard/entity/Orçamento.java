package br.com.dashboard.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@Entity
public class Orçamento {
    @Id @GeneratedValue
    private Long id;
    private String mpa;
    private BigDecimal volumeOrcado;
    private BigDecimal quantidadeExecutado;
    private BigDecimal percentualExecucao;
    private BigDecimal mediaValorOrcado;
    private BigDecimal mediaValorExecutado;
    private BigDecimal difTraco;
    private BigDecimal valorTotalOrcado;
    private BigDecimal valorOrcadoParcial;
    private BigDecimal valorExecutadoParcial;
    private BigDecimal disponivelParaExecucao;
    private BigDecimal economia;

}
