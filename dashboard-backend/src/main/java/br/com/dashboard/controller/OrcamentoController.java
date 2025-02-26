package br.com.dashboard.controller;

import br.com.dashboard.dto.ExcelFileResponseDTO;
import br.com.dashboard.entity.Orçamento;
import br.com.dashboard.service.OrcamentoService;
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
@RequestMapping("/api/orcamentos")
@Tag(name = "Orçamento", description = "API para gerenciamento de orçamentos")
public class OrcamentoController {

    private final OrcamentoService orcamentoService;
    private final S3Service s3Service;
    
    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    @Autowired
    public OrcamentoController(OrcamentoService orcamentoService, S3Service s3Service) {
        this.orcamentoService = orcamentoService;
        this.s3Service = s3Service;
    }

    @GetMapping
    @Operation(summary = "Listar todos os orçamentos", description = "Retorna uma lista com todos os orçamentos cadastrados")
    public ResponseEntity<List<Orçamento>> findAll() {
        return ResponseEntity.ok(orcamentoService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar orçamento por ID", description = "Retorna um orçamento específico pelo seu ID")
    public ResponseEntity<Orçamento> findById(@PathVariable Long id) {
        return orcamentoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Cadastrar orçamento", description = "Cadastra um novo orçamento")
    public ResponseEntity<Orçamento> save(@RequestBody Orçamento orcamento) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orcamentoService.save(orcamento));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar orçamento", description = "Atualiza um orçamento existente")
    public ResponseEntity<Orçamento> update(@PathVariable Long id, @RequestBody Orçamento orcamento) {
        if (!orcamentoService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        orcamento.setId(id);
        return ResponseEntity.ok(orcamentoService.save(orcamento));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir orçamento", description = "Exclui um orçamento pelo seu ID")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!orcamentoService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        orcamentoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/import-excel")
    @Operation(summary = "Importar orçamentos de Excel", description = "Importa orçamentos de uma planilha Excel")
    public ResponseEntity<ExcelFileResponseDTO> importExcel(@RequestParam("file") MultipartFile file) {
        try {
            int recordCount = orcamentoService.importFromExcel(file);
            
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
    @Operation(summary = "Exportar orçamentos para Excel", description = "Exporta orçamentos para uma planilha Excel")
    public ResponseEntity<ExcelFileResponseDTO> exportExcel() {
        try {
            String s3Key = orcamentoService.exportToExcel();
            
            ExcelFileResponseDTO response = new ExcelFileResponseDTO();
            response.setFileName("orcamento_export.xlsx");
            response.setFileUrl("/api/orcamentos/download-excel/" + s3Key);
            response.setMessage("Exportação realizada com sucesso");
            response.setRecordCount(orcamentoService.findAll().size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ExcelFileResponseDTO("orcamento_export.xlsx", null, e.getMessage(), 0));
        }
    }

    @GetMapping("/download-excel/{key}")
    @Operation(summary = "Download de planilha Excel", description = "Faz o download de uma planilha Excel de orçamentos")
    public ResponseEntity<InputStreamResource> downloadExcel(@PathVariable String key) {
        try {
            InputStream excelStream = s3Service.downloadFile(key);
            
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=orcamento_export.xlsx");
            
            return ResponseEntity.ok()
                    .headers(headers)
                    .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                    .body(new InputStreamResource(excelStream));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
