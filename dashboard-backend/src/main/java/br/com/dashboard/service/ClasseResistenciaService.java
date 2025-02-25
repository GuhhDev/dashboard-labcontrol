package br.com.dashboard.service;

import br.com.dashboard.dto.ClasseResistenciaDTO;
import br.com.dashboard.entity.ClasseResistencia;
import br.com.dashboard.repository.ClasseResistenciaRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ClasseResistenciaService {

    @Autowired
    private ClasseResistenciaRepository classeResistenciaRepository;

    @Transactional
    public ClasseResistenciaDTO.Response criar(ClasseResistenciaDTO.Request request) {
        ClasseResistencia classeResistencia = new ClasseResistencia();
        classeResistencia.setValor(request.getValor());
        classeResistencia.setNome(request.getNome());
        classeResistencia.setFck(request.getFck());

        classeResistencia = classeResistenciaRepository.save(classeResistencia);
        return toResponse(classeResistencia);
    }

    @Transactional
    public ClasseResistenciaDTO.Response atualizar(Long id, ClasseResistenciaDTO.Request request) {
        ClasseResistencia classeResistencia = classeResistenciaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Classe de resistência não encontrada"));

        classeResistencia.setValor(request.getValor());
        classeResistencia.setNome(request.getNome());
        classeResistencia.setFck(request.getFck());

        classeResistencia = classeResistenciaRepository.save(classeResistencia);
        return toResponse(classeResistencia);
    }

    @Transactional(readOnly = true)
    public ClasseResistenciaDTO.Response buscarPorId(Long id) {
        return classeResistenciaRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new EntityNotFoundException("Classe de resistência não encontrada"));
    }

    @Transactional(readOnly = true)
    public Page<ClasseResistenciaDTO.ListResponse> listar(Pageable pageable) {
        return classeResistenciaRepository.findAll(pageable)
                .map(this::toListResponse);
    }

    @Transactional
    public void deletar(Long id) {
        if (!classeResistenciaRepository.existsById(id)) {
            throw new EntityNotFoundException("Classe de resistência não encontrada");
        }
        classeResistenciaRepository.deleteById(id);
    }

    private ClasseResistenciaDTO.Response toResponse(ClasseResistencia classeResistencia) {
        ClasseResistenciaDTO.Response response = new ClasseResistenciaDTO.Response();
        response.setId(classeResistencia.getId());
        response.setValor(classeResistencia.getValor());
        response.setNome(classeResistencia.getNome());
        response.setFck(classeResistencia.getFck());
        return response;
    }

    private ClasseResistenciaDTO.ListResponse toListResponse(ClasseResistencia classeResistencia) {
        ClasseResistenciaDTO.ListResponse response = new ClasseResistenciaDTO.ListResponse();
        response.setId(classeResistencia.getId());
        response.setValor(classeResistencia.getValor());
        response.setNome(classeResistencia.getNome());
        response.setFck(classeResistencia.getFck());
        return response;
    }
}
