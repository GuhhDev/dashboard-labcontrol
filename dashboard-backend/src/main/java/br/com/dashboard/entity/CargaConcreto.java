package br.com.dashboard.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class CargaConcreto {
    @Id @GeneratedValue
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

    @ElementCollection
    private List<String> fotosUrls;

    @OneToOne(cascade = CascadeType.ALL)
    private InformacaoCarregamento informacaoCarregamento;

    @ManyToOne
    private Concreteira concreteira;

    @ManyToOne
    private ClasseResistencia resistenciaConcreto;

    @ManyToOne
    private Obra obra;

    @OneToMany(mappedBy = "carga", cascade = CascadeType.ALL)
    private List<Amostra> amostras;
}
