package br.com.dashboard.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class ClasseResistencia {
    @Id
    @GeneratedValue
    private Long id;
    private String valor;
    private String nome;
    private Double fck;
}
