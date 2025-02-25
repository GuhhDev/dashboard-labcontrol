package br.com.dashboard.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Laboratorio {
    @Id
    @GeneratedValue
    private Long id;
    private String nome;
    private String responsavel;
    private String email;
    private String telefone;
}
