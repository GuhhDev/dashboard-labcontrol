package br.com.dashboard.dto;

import lombok.Data;

@Data
public class EnsaiosPorStatusDTO {
    private String status;
    private long quantidade;
}
