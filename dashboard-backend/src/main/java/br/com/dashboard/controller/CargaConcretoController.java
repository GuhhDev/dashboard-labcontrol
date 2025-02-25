package br.com.dashboard.controller;

import br.com.dashboard.dto.CargaConcretoDTO;
import br.com.dashboard.service.CargaConcretoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cargas")
public class CargaConcretoController {

    @Autowired
    private CargaConcretoService cargaConcretoService;

    @PostMapping
    public ResponseEntity<CargaConcretoDTO> criar(@RequestBody @Valid CargaConcretoDTO dto) {
        return ResponseEntity.ok(cargaConcretoService.criar(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CargaConcretoDTO> atualizar(@PathVariable Long id, @RequestBody @Valid CargaConcretoDTO dto) {
        return ResponseEntity.ok(cargaConcretoService.atualizar(id, dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CargaConcretoDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(cargaConcretoService.buscarPorId(id));
    }

    @GetMapping
    public ResponseEntity<Page<CargaConcretoDTO>> listar(Pageable pageable) {
        return ResponseEntity.ok(cargaConcretoService.listar(pageable));
    }

    @GetMapping("/obra/{obraId}")
    public ResponseEntity<Page<CargaConcretoDTO>> listarPorObra(@PathVariable Long obraId, Pageable pageable) {
        return ResponseEntity.ok(cargaConcretoService.listarPorObra(obraId, pageable));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        cargaConcretoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
