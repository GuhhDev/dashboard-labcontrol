package br.com.dashboard.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

public class ClienteDTO {

    @Data
    public static class Request {
        @NotBlank(message = "Nome é obrigatório")
        private String nome;

        @NotBlank(message = "Responsável é obrigatório")
        private String responsavel;

        @NotBlank(message = "Email é obrigatório")
        @Email(message = "Email inválido")
        private String email;

        private String telefone;
    }

    @Data
    public static class Response {
        private Long id;
        private String nome;
        private String responsavel;
        private String email;
        private String telefone;
    }

    @Data
    public static class ListResponse {
        private Long id;
        private String nome;
        private String responsavel;
    }
}
