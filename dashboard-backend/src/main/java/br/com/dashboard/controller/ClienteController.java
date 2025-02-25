package br.com.dashboard.controller;

import br.com.dashboard.dto.ClienteDTO;
import br.com.dashboard.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @PostMapping
    public ResponseEntity<ClienteDTO.Response> criar(
            @RequestBody @Valid ClienteDTO.Request request,
            UriComponentsBuilder uriBuilder
    ) {
        ClienteDTO.Response response = clienteService.criar(request);
        URI uri = uriBuilder.path("/api/clientes/{id}")
                .buildAndExpand(response.getId())
                .toUri();
        return ResponseEntity.created(uri).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClienteDTO.Response> atualizar(
            @PathVariable Long id,
            @RequestBody @Valid ClienteDTO.Request request
    ) {
        ClienteDTO.Response response = clienteService.atualizar(id, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteDTO.Response> buscarPorId(@PathVariable Long id) {
        ClienteDTO.Response response = clienteService.buscarPorId(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<Page<ClienteDTO.ListResponse>> listar(Pageable pageable) {
        Page<ClienteDTO.ListResponse> response = clienteService.listar(pageable);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        clienteService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
