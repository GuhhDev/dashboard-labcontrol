package br.com.dashboard.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

public class ClasseResistenciaDTO {

    @Data
    public static class Request {
        @NotNull
        private String valor;
        
        @NotNull
        private String nome;
        
        @NotNull
        private Double fck;
    }

    @Data
    public static class Response {
        private Long id;
        private String valor;
        private String nome;
        private Double fck;
    }

    @Data
    public static class ListResponse {
        private Long id;
        private String valor;
        private String nome;
        private Double fck;
    }
}
