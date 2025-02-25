package br.com.dashboard.service;

import br.com.dashboard.dto.LaboratorioDTO;
import br.com.dashboard.entity.Laboratorio;
import br.com.dashboard.repository.LaboratorioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LaboratorioService {

    @Autowired
    private LaboratorioRepository laboratorioRepository;

    @Transactional
    public LaboratorioDTO.Response criar(LaboratorioDTO.Request request) {
        Laboratorio laboratorio = new Laboratorio();
        laboratorio.setNome(request.getNome());
        laboratorio.setResponsavel(request.getResponsavel());
        laboratorio.setEmail(request.getEmail());
        laboratorio.setTelefone(request.getTelefone());

        laboratorio = laboratorioRepository.save(laboratorio);
        return toResponse(laboratorio);
    }

    @Transactional
    public LaboratorioDTO.Response atualizar(Long id, LaboratorioDTO.Request request) {
        Laboratorio laboratorio = laboratorioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Laboratório não encontrado"));

        laboratorio.setNome(request.getNome());
        laboratorio.setResponsavel(request.getResponsavel());
        laboratorio.setEmail(request.getEmail());
        laboratorio.setTelefone(request.getTelefone());

        laboratorio = laboratorioRepository.save(laboratorio);
        return toResponse(laboratorio);
    }

    @Transactional(readOnly = true)
    public LaboratorioDTO.Response buscarPorId(Long id) {
        return laboratorioRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new EntityNotFoundException("Laboratório não encontrado"));
    }

    @Transactional(readOnly = true)
    public Page<LaboratorioDTO.Response> listar(Pageable pageable) {
        return laboratorioRepository.findAll(pageable)
                .map(this::toResponse);
    }

    @Transactional
    public void deletar(Long id) {
        if (!laboratorioRepository.existsById(id)) {
            throw new EntityNotFoundException("Laboratório não encontrado");
        }
        laboratorioRepository.deleteById(id);
    }

    private LaboratorioDTO.Response toResponse(Laboratorio laboratorio) {
        LaboratorioDTO.Response response = new LaboratorioDTO.Response();
        response.setId(laboratorio.getId());
        response.setNome(laboratorio.getNome());
        response.setResponsavel(laboratorio.getResponsavel());
        response.setEmail(laboratorio.getEmail());
        response.setTelefone(laboratorio.getTelefone());
        return response;
    }
}
