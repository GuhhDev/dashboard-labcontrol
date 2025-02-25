package br.com.dashboard.entity;

import br.com.dashboard.enums.ResultadoEnsaio;
import br.com.dashboard.enums.StatusEnsaio;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Entity
public class Ensaio {
    @Id @GeneratedValue
    private Long id;

    private LocalDate dataEnsaio;
    private Double resultado;
    private String formaRuptura;
    private Double desvioPadrao;
    private Double coeficienteVariacao;

    @ElementCollection
    private List<String> fotosUrls;

    @Enumerated(EnumType.STRING)
    private StatusEnsaio status;

    @Enumerated(EnumType.STRING)
    private ResultadoEnsaio resultadoAvaliacao;

    @ManyToOne
    private Amostra amostra;

    @ManyToOne
    private IdadeCP idadeCP;

    @OneToOne(mappedBy = "ensaio")
    private NaoConformidade naoConformidade;

}