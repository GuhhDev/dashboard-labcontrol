package br.com.dashboard.dto;

import br.com.dashboard.enums.ResultadoEnsaio;
import br.com.dashboard.enums.StatusEnsaio;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

public class EnsaioDTO {

    @Data
    public static class Request {
        @NotNull
        private LocalDate dataEnsaio;
        
        @NotNull
        private Double resultado;
        
        private String formaRuptura;
        private Double desvioPadrao;
        private Double coeficienteVariacao;
        private List<String> fotosUrls;
        
        @NotNull
        private Long amostraId;
        
        @NotNull
        private Long idadeCPId;
        
        private StatusEnsaio status;
        private ResultadoEnsaio resultadoAvaliacao;
    }

    @Data
    public static class Response {
        private Long id;
        private LocalDate dataEnsaio;
        private Double resultado;
        private String formaRuptura;
        private Double desvioPadrao;
        private Double coeficienteVariacao;
        private List<String> fotosUrls;
        private Long amostraId;
        private String idAmostra;
        private Long idadeCPId;
        private Integer diasIdadeCP;
        private StatusEnsaio status;
        private ResultadoEnsaio resultadoAvaliacao;
    }

    @Data
    public static class ListResponse {
        private Long id;
        private LocalDate dataEnsaio;
        private Double resultado;
        private Integer diasIdadeCP;
        private StatusEnsaio status;
        private ResultadoEnsaio resultadoAvaliacao;
    }
}
