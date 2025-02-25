package br.com.dashboard.entity;

import br.com.dashboard.enums.Perfil;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Usuario {
    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true)
    private String email;

    private String nome;
    private String senha;

    @Enumerated(EnumType.STRING)
    private Perfil perfil;
}
