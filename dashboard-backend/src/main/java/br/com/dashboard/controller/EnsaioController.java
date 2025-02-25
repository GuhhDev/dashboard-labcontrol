package br.com.dashboard.controller;

import br.com.dashboard.dto.EnsaioDTO;
import br.com.dashboard.service.EnsaioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/ensaios")
public class EnsaioController {

    @Autowired
    private EnsaioService ensaioService;

    @PostMapping
    public ResponseEntity<EnsaioDTO.Response> criar(
            @RequestBody @Valid EnsaioDTO.Request request,
            UriComponentsBuilder uriBuilder
    ) {
        EnsaioDTO.Response response = ensaioService.criar(request);
        URI uri = uriBuilder.path("/api/ensaios/{id}")
                .buildAndExpand(response.getId())
                .toUri();
        return ResponseEntity.created(uri).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EnsaioDTO.Response> atualizar(
            @PathVariable Long id,
            @RequestBody @Valid EnsaioDTO.Request request
    ) {
        EnsaioDTO.Response response = ensaioService.atualizar(id, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EnsaioDTO.Response> buscarPorId(@PathVariable Long id) {
        EnsaioDTO.Response response = ensaioService.buscarPorId(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<Page<EnsaioDTO.ListResponse>> listar(Pageable pageable) {
        Page<EnsaioDTO.ListResponse> response = ensaioService.listar(pageable);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        ensaioService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
