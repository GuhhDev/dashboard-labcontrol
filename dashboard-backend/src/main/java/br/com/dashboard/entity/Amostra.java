package br.com.dashboard.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Entity
public class Amostra {
    @Id @GeneratedValue
    private Long id;
    private String idAmostra; // Pode incluir QR Code
    private LocalDate dataRetirada;

    @ManyToOne
    private CargaConcreto carga;

    @ManyToOne
    private ClasseResistencia resistenciaProjeto;

    @ManyToMany
    private List<IdadeCP> idadesEscolhidas;

    @OneToMany(mappedBy = "amostra")
    private List<Ensaio> ensaios;
}
