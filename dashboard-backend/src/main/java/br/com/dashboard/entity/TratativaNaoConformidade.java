package br.com.dashboard.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class TratativaNaoConformidade {
    @Id @GeneratedValue
    private Long id;

    private String motivo; // Investigação do ocorrido
    private String planoAcao; // O que será feito
    private String comentarios; // Espaço para comentários
    private String avaliacaoFinal; // Problema resolvido? Existe mesmo?
    private String solucao; // Descarte de concreto? Reforço estrutural? Liberação?

    @ElementCollection
    private List<String> fotosUrls; // Fotos da investigação

    @ElementCollection
    private List<String> anexosUrls; // Anexos de documentos da tratativa

    @OneToOne
    @JoinColumn(name = "nao_conformidade_id")
    private NaoConformidade naoConformidade;
}
