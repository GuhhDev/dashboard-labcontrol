package br.com.dashboard.controller;

import br.com.dashboard.dto.IdadeCPDTO;
import br.com.dashboard.service.IdadeCPService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/idades-cp")
public class IdadeCPController {

    @Autowired
    private IdadeCPService idadeCPService;

    @PostMapping
    public ResponseEntity<IdadeCPDTO.Response> criar(
            @RequestBody @Valid IdadeCPDTO.Request request,
            UriComponentsBuilder uriBuilder
    ) {
        IdadeCPDTO.Response response = idadeCPService.criar(request);
        URI uri = uriBuilder.path("/api/idades-cp/{id}")
                .buildAndExpand(response.getId())
                .toUri();
        return ResponseEntity.created(uri).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<IdadeCPDTO.Response> atualizar(
            @PathVariable Long id,
            @RequestBody @Valid IdadeCPDTO.Request request
    ) {
        IdadeCPDTO.Response response = idadeCPService.atualizar(id, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<IdadeCPDTO.Response> buscarPorId(@PathVariable Long id) {
        IdadeCPDTO.Response response = idadeCPService.buscarPorId(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<Page<IdadeCPDTO.ListResponse>> listar(Pageable pageable) {
        Page<IdadeCPDTO.ListResponse> response = idadeCPService.listar(pageable);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        idadeCPService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
