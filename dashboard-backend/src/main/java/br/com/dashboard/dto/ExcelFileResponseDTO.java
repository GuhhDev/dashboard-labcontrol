package br.com.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExcelFileResponseDTO {
    private String fileName;
    private String fileUrl;
    private String message;
    private int recordCount;
}
