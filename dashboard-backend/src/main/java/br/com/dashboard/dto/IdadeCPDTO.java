package br.com.dashboard.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

public class IdadeCPDTO {

    @Data
    public static class Request {
        @NotNull(message = "Dias é obrigatório")
        @Positive(message = "Dias deve ser maior que zero")
        private Integer dias;
    }

    @Data
    public static class Response {
        private Long id;
        private Integer dias;
    }

    @Data
    public static class ListResponse {
        private Long id;
        private Integer dias;
    }
}
