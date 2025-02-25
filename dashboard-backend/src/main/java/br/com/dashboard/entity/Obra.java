package br.com.dashboard.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Entity
public class Obra {
    @Id
    @GeneratedValue
    private Long id;
    private String nome;
    private String local;
    private String tipoConstrucao;
    private LocalDate dataInicio;
    private LocalDate dataFim;
    private String responsavel;

    @ManyToOne
    private Cliente cliente;

    @OneToMany(mappedBy = "obra")
    private List<CargaConcreto> cargas;

    @OneToMany(mappedBy = "obra")
    private List<Concreteira> concreteiras;
}
