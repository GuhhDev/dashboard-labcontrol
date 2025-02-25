package br.com.dashboard.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class AmostraDTO {
    private Long id;
    private String idAmostra; // Pode incluir QR Code
    private LocalDate dataRetirada;
    private Long cargaId;
    private Long resistenciaProjetoId;
    private List<Long> idadesEscolhidasIds;
    private List<Long> ensaiosIds;
}
