package br.com.dashboard.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Cliente {
    @Id
    @GeneratedValue
    private Long id;
    private String nome;
    private String responsavel;
    private String email;
    private String telefone;

    @OneToMany(mappedBy = "cliente")
    private List<Obra> obras;
}