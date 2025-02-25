package br.com.dashboard.controller;

import br.com.dashboard.dto.AmostraDTO;
import br.com.dashboard.service.AmostraService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/amostras")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AmostraController {

    @Autowired
    private AmostraService amostraService;

    @PostMapping
    public ResponseEntity<AmostraDTO> criar(@RequestBody @Valid AmostraDTO dto) {
        return ResponseEntity.ok(amostraService.criar(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AmostraDTO> atualizar(@PathVariable Long id, @RequestBody @Valid AmostraDTO dto) {
        return ResponseEntity.ok(amostraService.atualizar(id, dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AmostraDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(amostraService.buscarPorId(id));
    }

    @GetMapping
    public ResponseEntity<Page<AmostraDTO>> listar(Pageable pageable) {
        return ResponseEntity.ok(amostraService.listar(pageable));
    }

    @GetMapping("/carga/{cargaId}")
    public ResponseEntity<Page<AmostraDTO>> listarPorCarga(@PathVariable Long cargaId, Pageable pageable) {
        return ResponseEntity.ok(amostraService.listarPorCarga(cargaId, pageable));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        amostraService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
