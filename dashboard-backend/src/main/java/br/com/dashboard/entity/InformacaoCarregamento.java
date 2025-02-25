package br.com.dashboard.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class InformacaoCarregamento {
    @Id @GeneratedValue
    private Long id;
    
    private Double quantidadeCimento;
    private Double quantidadeAreia;
    private Double quantidadeBrita0;
    private Double quantidadeBrita1;
    private Double quantidadeAgua;
    private Double quantidadeAditivos;
    private Double fatorAguaCimento;
}
