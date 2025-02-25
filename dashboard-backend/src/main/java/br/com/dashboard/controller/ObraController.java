package br.com.dashboard.controller;

import br.com.dashboard.dto.ObraDTO;
import br.com.dashboard.service.ObraService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/obras")
public class ObraController {

    @Autowired
    private ObraService obraService;

    @PostMapping
    public ResponseEntity<ObraDTO.Response> criar(
            @RequestBody @Valid ObraDTO.Request request,
            UriComponentsBuilder uriBuilder
    ) {
        ObraDTO.Response response = obraService.criar(request);
        URI uri = uriBuilder.path("/api/obras/{id}")
                .buildAndExpand(response.getId())
                .toUri();
        return ResponseEntity.created(uri).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ObraDTO.Response> atualizar(
            @PathVariable Long id,
            @RequestBody @Valid ObraDTO.Request request
    ) {
        ObraDTO.Response response = obraService.atualizar(id, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ObraDTO.Response> buscarPorId(@PathVariable Long id) {
        ObraDTO.Response response = obraService.buscarPorId(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<Page<ObraDTO.ListResponse>> listar(Pageable pageable) {
        Page<ObraDTO.ListResponse> response = obraService.listar(pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<Page<ObraDTO.ListResponse>> listarPorCliente(
            @PathVariable Long clienteId,
            Pageable pageable
    ) {
        Page<ObraDTO.ListResponse> response = obraService.listarPorCliente(clienteId, pageable);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        obraService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
