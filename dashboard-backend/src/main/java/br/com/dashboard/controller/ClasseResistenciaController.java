package br.com.dashboard.controller;

import br.com.dashboard.dto.ClasseResistenciaDTO;
import br.com.dashboard.service.ClasseResistenciaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/classes-resistencia")
public class ClasseResistenciaController {

    @Autowired
    private ClasseResistenciaService classeResistenciaService;

    @PostMapping
    public ResponseEntity<ClasseResistenciaDTO.Response> criar(
            @RequestBody @Valid ClasseResistenciaDTO.Request request,
            UriComponentsBuilder uriBuilder
    ) {
        ClasseResistenciaDTO.Response response = classeResistenciaService.criar(request);
        URI uri = uriBuilder.path("/api/classes-resistencia/{id}")
                .buildAndExpand(response.getId())
                .toUri();
        return ResponseEntity.created(uri).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClasseResistenciaDTO.Response> atualizar(
            @PathVariable Long id,
            @RequestBody @Valid ClasseResistenciaDTO.Request request
    ) {
        ClasseResistenciaDTO.Response response = classeResistenciaService.atualizar(id, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClasseResistenciaDTO.Response> buscarPorId(@PathVariable Long id) {
        ClasseResistenciaDTO.Response response = classeResistenciaService.buscarPorId(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<Page<ClasseResistenciaDTO.ListResponse>> listar(Pageable pageable) {
        Page<ClasseResistenciaDTO.ListResponse> response = classeResistenciaService.listar(pageable);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        classeResistenciaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
