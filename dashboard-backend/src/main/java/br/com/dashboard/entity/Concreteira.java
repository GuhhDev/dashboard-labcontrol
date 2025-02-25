package br.com.dashboard.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Concreteira {
    @Id
    @GeneratedValue
    private Long id;
    private String nome;

    @ManyToOne
    private Obra obra;
}
