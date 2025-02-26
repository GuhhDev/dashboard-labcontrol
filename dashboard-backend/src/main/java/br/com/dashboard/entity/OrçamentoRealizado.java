package br.com.dashboard.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
public class OrçamentoRealizado {

    @Id @GeneratedValue
    private Long id;
    private String material;

    private BigDecimal orcamentoTon;
    private BigDecimal orcamentoCustoPorTon;
    private BigDecimal orcamentoValorTotal;

    private BigDecimal sistemaTonL;
    private BigDecimal sistemaCustoPorTonL;
    private BigDecimal sistemaValorTotal;

    private BigDecimal saldoTon;
    private BigDecimal saldoValor;

    private BigDecimal diferencaTon;
    private BigDecimal diferencaCustoPorTon;
    private BigDecimal diferencaValorTotal;

}
