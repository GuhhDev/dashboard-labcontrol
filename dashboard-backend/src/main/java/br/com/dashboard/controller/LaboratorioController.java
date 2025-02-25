package br.com.dashboard.controller;

import br.com.dashboard.dto.LaboratorioDTO;
import br.com.dashboard.service.LaboratorioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/laboratorios")
public class LaboratorioController {

    @Autowired
    private LaboratorioService laboratorioService;

    @PostMapping
    public ResponseEntity<LaboratorioDTO.Response> criar(@RequestBody @Valid LaboratorioDTO.Request request, UriComponentsBuilder uriBuilder) {
        LaboratorioDTO.Response response = laboratorioService.criar(request);
        URI uri = uriBuilder.path("/api/laboratorios/{id}").buildAndExpand(response.getId()).toUri();
        return ResponseEntity.created(uri).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LaboratorioDTO.Response> atualizar(@PathVariable Long id, @RequestBody @Valid LaboratorioDTO.Request request) {
        LaboratorioDTO.Response response = laboratorioService.atualizar(id, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LaboratorioDTO.Response> buscarPorId(@PathVariable Long id) {
        LaboratorioDTO.Response response = laboratorioService.buscarPorId(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<Page<LaboratorioDTO.Response>> listar(Pageable pageable) {
        Page<LaboratorioDTO.Response> response = laboratorioService.listar(pageable);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        laboratorioService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
