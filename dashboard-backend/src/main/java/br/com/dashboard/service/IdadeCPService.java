package br.com.dashboard.service;

import br.com.dashboard.dto.IdadeCPDTO;
import br.com.dashboard.entity.IdadeCP;
import br.com.dashboard.repository.IdadeCPRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class IdadeCPService {

    @Autowired
    private IdadeCPRepository idadeCPRepository;

    @Transactional
    public IdadeCPDTO.Response criar(IdadeCPDTO.Request request) {
        IdadeCP idadeCP = new IdadeCP();
        idadeCP.setDias(request.getDias());

        idadeCP = idadeCPRepository.save(idadeCP);
        return toResponse(idadeCP);
    }

    @Transactional
    public IdadeCPDTO.Response atualizar(Long id, IdadeCPDTO.Request request) {
        IdadeCP idadeCP = idadeCPRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Idade CP não encontrada"));

        idadeCP.setDias(request.getDias());

        idadeCP = idadeCPRepository.save(idadeCP);
        return toResponse(idadeCP);
    }

    @Transactional(readOnly = true)
    public IdadeCPDTO.Response buscarPorId(Long id) {
        return idadeCPRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new EntityNotFoundException("Idade CP não encontrada"));
    }

    @Transactional(readOnly = true)
    public Page<IdadeCPDTO.ListResponse> listar(Pageable pageable) {
        return idadeCPRepository.findAll(pageable)
                .map(this::toListResponse);
    }

    @Transactional
    public void deletar(Long id) {
        if (!idadeCPRepository.existsById(id)) {
            throw new EntityNotFoundException("Idade CP não encontrada");
        }
        idadeCPRepository.deleteById(id);
    }

    private IdadeCPDTO.Response toResponse(IdadeCP idadeCP) {
        IdadeCPDTO.Response response = new IdadeCPDTO.Response();
        response.setId(idadeCP.getId());
        response.setDias(idadeCP.getDias());
        return response;
    }

    private IdadeCPDTO.ListResponse toListResponse(IdadeCP idadeCP) {
        IdadeCPDTO.ListResponse response = new IdadeCPDTO.ListResponse();
        response.setId(idadeCP.getId());
        response.setDias(idadeCP.getDias());
        return response;
    }
}
