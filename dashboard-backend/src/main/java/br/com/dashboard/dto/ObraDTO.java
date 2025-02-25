package br.com.dashboard.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

public class ObraDTO {

    @Data
    public static class Request {
        @NotBlank(message = "Nome é obrigatório")
        private String nome;

        @NotBlank(message = "Local é obrigatório")
        private String local;

        @NotBlank(message = "Tipo de construção é obrigatório")
        private String tipoConstrucao;

        @NotBlank(message = "Responsável é obrigatório")
        private String responsavel;

        @NotNull(message = "Data de início é obrigatória")
        private LocalDate dataInicio;

        private LocalDate dataFim;

        @NotNull(message = "Cliente é obrigatório")
        private Long clienteId;
    }

    @Data
    public static class Response {
        private Long id;
        private String nome;
        private String local;
        private String tipoConstrucao;
        private String responsavel;
        private LocalDate dataInicio;
        private LocalDate dataFim;
        private ClienteDTO.Response cliente;
    }

    @Data
    public static class ListResponse {
        private Long id;
        private String nome;
        private String local;
        private String tipoConstrucao;
        private LocalDate dataInicio;
        private LocalDate dataFim;
    }
}
