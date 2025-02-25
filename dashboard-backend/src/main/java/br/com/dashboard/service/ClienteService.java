package br.com.dashboard.service;

import br.com.dashboard.dto.ClienteDTO;
import br.com.dashboard.entity.Cliente;
import br.com.dashboard.repository.ClienteRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Transactional
    public ClienteDTO.Response criar(ClienteDTO.Request request) {
        Cliente cliente = new Cliente();
        cliente.setNome(request.getNome());
        cliente.setResponsavel(request.getResponsavel());
        cliente.setEmail(request.getEmail());
        cliente.setTelefone(request.getTelefone());

        cliente = clienteRepository.save(cliente);
        return toResponse(cliente);
    }

    @Transactional
    public ClienteDTO.Response atualizar(Long id, ClienteDTO.Request request) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado"));

        cliente.setNome(request.getNome());
        cliente.setResponsavel(request.getResponsavel());
        cliente.setEmail(request.getEmail());
        cliente.setTelefone(request.getTelefone());

        cliente = clienteRepository.save(cliente);
        return toResponse(cliente);
    }

    @Transactional(readOnly = true)
    public ClienteDTO.Response buscarPorId(Long id) {
        return clienteRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado"));
    }

    @Transactional(readOnly = true)
    public Page<ClienteDTO.ListResponse> listar(Pageable pageable) {
        return clienteRepository.findAll(pageable)
                .map(this::toListResponse);
    }

    @Transactional
    public void deletar(Long id) {
        if (!clienteRepository.existsById(id)) {
            throw new EntityNotFoundException("Cliente não encontrado");
        }
        clienteRepository.deleteById(id);
    }

    private ClienteDTO.Response toResponse(Cliente cliente) {
        ClienteDTO.Response response = new ClienteDTO.Response();
        response.setId(cliente.getId());
        response.setNome(cliente.getNome());
        response.setResponsavel(cliente.getResponsavel());
        response.setEmail(cliente.getEmail());
        response.setTelefone(cliente.getTelefone());
        return response;
    }

    private ClienteDTO.ListResponse toListResponse(Cliente cliente) {
        ClienteDTO.ListResponse response = new ClienteDTO.ListResponse();
        response.setId(cliente.getId());
        response.setNome(cliente.getNome());
        response.setResponsavel(cliente.getResponsavel());
        return response;
    }
}
