package br.com.dashboard.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Entity
public class Relatorio {
    @Id @GeneratedValue
    private Long id;

    private String nome;
    private LocalDate dataGeracao;

    @ManyToOne
    private Obra obra;

    @OneToMany(mappedBy = "relatorio")
    private List<ResultadoAmostra> resultadosAmostras;

    @ElementCollection
    private List<String> graficosUrls;
}
