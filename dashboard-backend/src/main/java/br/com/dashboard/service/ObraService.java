package br.com.dashboard.service;

import br.com.dashboard.dto.ClienteDTO;
import br.com.dashboard.dto.ObraDTO;
import br.com.dashboard.entity.Cliente;
import br.com.dashboard.entity.Obra;
import br.com.dashboard.repository.ClienteRepository;
import br.com.dashboard.repository.ObraRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ObraService {

    @Autowired
    private ObraRepository obraRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Transactional
    public ObraDTO.Response criar(ObraDTO.Request request) {
        Cliente cliente = clienteRepository.findById(request.getClienteId())
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado"));

        Obra obra = new Obra();
        obra.setNome(request.getNome());
        obra.setLocal(request.getLocal());
        obra.setTipoConstrucao(request.getTipoConstrucao());
        obra.setResponsavel(request.getResponsavel());
        obra.setDataInicio(request.getDataInicio());
        obra.setDataFim(request.getDataFim());
        obra.setCliente(cliente);

        obra = obraRepository.save(obra);
        return toResponse(obra);
    }

    @Transactional
    public ObraDTO.Response atualizar(Long id, ObraDTO.Request request) {
        Obra obra = obraRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Obra não encontrada"));

        Cliente cliente = clienteRepository.findById(request.getClienteId())
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado"));

        obra.setNome(request.getNome());
        obra.setLocal(request.getLocal());
        obra.setTipoConstrucao(request.getTipoConstrucao());
        obra.setResponsavel(request.getResponsavel());
        obra.setDataInicio(request.getDataInicio());
        obra.setDataFim(request.getDataFim());
        obra.setCliente(cliente);

        obra = obraRepository.save(obra);
        return toResponse(obra);
    }

    @Transactional(readOnly = true)
    public ObraDTO.Response buscarPorId(Long id) {
        return obraRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new EntityNotFoundException("Obra não encontrada"));
    }

    @Transactional(readOnly = true)
    public Page<ObraDTO.ListResponse> listar(Pageable pageable) {
        return obraRepository.findAll(pageable)
                .map(this::toListResponse);
    }

    @Transactional(readOnly = true)
    public Page<ObraDTO.ListResponse> listarPorCliente(Long clienteId, Pageable pageable) {
        return obraRepository.findByClienteId(clienteId, pageable).map(this::toListResponse);
    }

    @Transactional
    public void deletar(Long id) {
        if (!obraRepository.existsById(id)) {
            throw new EntityNotFoundException("Obra não encontrada");
        }
        obraRepository.deleteById(id);
    }

    private ObraDTO.Response toResponse(Obra obra) {
        ObraDTO.Response response = new ObraDTO.Response();
        response.setId(obra.getId());
        response.setNome(obra.getNome());
        response.setLocal(obra.getLocal());
        response.setTipoConstrucao(obra.getTipoConstrucao());
        response.setResponsavel(obra.getResponsavel());
        response.setDataInicio(obra.getDataInicio());
        response.setDataFim(obra.getDataFim());

        if (obra.getCliente() != null) {
            ClienteDTO.Response clienteResponse = new ClienteDTO.Response();
            clienteResponse.setId(obra.getCliente().getId());
            clienteResponse.setNome(obra.getCliente().getNome());
            clienteResponse.setResponsavel(obra.getCliente().getResponsavel());
            clienteResponse.setEmail(obra.getCliente().getEmail());
            clienteResponse.setTelefone(obra.getCliente().getTelefone());
            response.setCliente(clienteResponse);
        }

        return response;
    }

    private ObraDTO.ListResponse toListResponse(Obra obra) {
        ObraDTO.ListResponse response = new ObraDTO.ListResponse();
        response.setId(obra.getId());
        response.setNome(obra.getNome());
        response.setLocal(obra.getLocal());
        response.setTipoConstrucao(obra.getTipoConstrucao());
        response.setDataInicio(obra.getDataInicio());
        response.setDataFim(obra.getDataFim());
        return response;
    }
}
