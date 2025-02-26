package br.com.dashboard.controller;

import br.com.dashboard.dto.ExcelFileResponseDTO;
import br.com.dashboard.entity.OrçamentoRealizado;
import br.com.dashboard.service.OrcamentoRealizadoService;
import br.com.dashboard.service.S3Service;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/api/orcamentos-realizados")
@Tag(name = "Orçamento Realizado", description = "API para gerenciamento de orçamentos realizados")
public class OrcamentoRealizadoController {

    private final OrcamentoRealizadoService orcamentoRealizadoService;
    private final S3Service s3Service;
    
    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    @Autowired
    public OrcamentoRealizadoController(OrcamentoRealizadoService orcamentoRealizadoService, S3Service s3Service) {
        this.orcamentoRealizadoService = orcamentoRealizadoService;
        this.s3Service = s3Service;
    }

    @GetMapping
    @Operation(summary = "Listar todos os orçamentos realizados", description = "Retorna uma lista com todos os orçamentos realizados cadastrados")
    public ResponseEntity<List<OrçamentoRealizado>> findAll() {
        return ResponseEntity.ok(orcamentoRealizadoService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar orçamento realizado por ID", description = "Retorna um orçamento realizado específico pelo seu ID")
    public ResponseEntity<OrçamentoRealizado> findById(@PathVariable Long id) {
        return orcamentoRealizadoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Cadastrar orçamento realizado", description = "Cadastra um novo orçamento realizado")
    public ResponseEntity<OrçamentoRealizado> save(@RequestBody OrçamentoRealizado orcamentoRealizado) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orcamentoRealizadoService.save(orcamentoRealizado));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar orçamento realizado", description = "Atualiza um orçamento realizado existente")
    public ResponseEntity<OrçamentoRealizado> update(@PathVariable Long id, @RequestBody OrçamentoRealizado orcamentoRealizado) {
        if (!orcamentoRealizadoService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        orcamentoRealizado.setId(id);
        return ResponseEntity.ok(orcamentoRealizadoService.save(orcamentoRealizado));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir orçamento realizado", description = "Exclui um orçamento realizado pelo seu ID")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!orcamentoRealizadoService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        orcamentoRealizadoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/import-excel")
    @Operation(summary = "Importar orçamentos realizados de Excel", description = "Importa orçamentos realizados de uma planilha Excel")
    public ResponseEntity<ExcelFileResponseDTO> importExcel(@RequestParam("file") MultipartFile file) {
        try {
            int recordCount = orcamentoRealizadoService.importFromExcel(file);
            
            ExcelFileResponseDTO response = new ExcelFileResponseDTO();
            response.setFileName(file.getOriginalFilename());
            response.setMessage("Importação realizada com sucesso");
            response.setRecordCount(recordCount);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ExcelFileResponseDTO(file.getOriginalFilename(), null, e.getMessage(), 0));
        }
    }

    @GetMapping("/export-excel")
    @Operation(summary = "Exportar orçamentos realizados para Excel", description = "Exporta orçamentos realizados para uma planilha Excel")
    public ResponseEntity<ExcelFileResponseDTO> exportExcel() {
        try {
            String s3Key = orcamentoRealizadoService.exportToExcel();
            
            ExcelFileResponseDTO response = new ExcelFileResponseDTO();
            response.setFileName("orcamento_realizado_export.xlsx");
            response.setFileUrl("/api/orcamentos-realizados/download-excel/" + s3Key);
            response.setMessage("Exportação realizada com sucesso");
            response.setRecordCount(orcamentoRealizadoService.findAll().size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ExcelFileResponseDTO("orcamento_realizado_export.xlsx", null, e.getMessage(), 0));
        }
    }

    @GetMapping("/download-excel/{key}")
    @Operation(summary = "Download de planilha Excel", description = "Faz o download de uma planilha Excel de orçamentos realizados")
    public ResponseEntity<InputStreamResource> downloadExcel(@PathVariable String key) {
        try {
            InputStream excelStream = s3Service.downloadFile(key);
            
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=orcamento_realizado_export.xlsx");
            
            return ResponseEntity.ok()
                    .headers(headers)
                    .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                    .body(new InputStreamResource(excelStream));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
