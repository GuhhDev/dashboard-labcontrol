package br.com.dashboard.entity;

import br.com.dashboard.enums.StatusNaoConformidade;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class NaoConformidade {
    @Id @GeneratedValue
    private Long id;
    private String descricao;
    private LocalDate dataAbertura;
    private LocalDate dataResolucao;

    @Enumerated(EnumType.STRING)
    private StatusNaoConformidade status;

    @OneToOne
    @JoinColumn(name = "ensaio_id")
    private Ensaio ensaio;
}
