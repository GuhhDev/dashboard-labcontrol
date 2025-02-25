package br.com.dashboard.service;

import br.com.dashboard.dto.AmostraDTO;
import br.com.dashboard.entity.Amostra;
import br.com.dashboard.entity.CargaConcreto;
import br.com.dashboard.entity.ClasseResistencia;
import br.com.dashboard.entity.IdadeCP;
import br.com.dashboard.repository.AmostraRepository;
import br.com.dashboard.repository.CargaConcretoRepository;
import br.com.dashboard.repository.ClasseResistenciaRepository;
import br.com.dashboard.repository.IdadeCPRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AmostraService {

    @Autowired
    private AmostraRepository amostraRepository;

    @Autowired
    private CargaConcretoRepository cargaConcretoRepository;

    @Autowired
    private ClasseResistenciaRepository resistenciaRepository;

    @Autowired
    private IdadeCPRepository idadeCPRepository;

    @Transactional
    public AmostraDTO criar(AmostraDTO dto) {
        Amostra amostra = new Amostra();
        return salvarOuAtualizar(amostra, dto);
    }

    @Transactional
    public AmostraDTO atualizar(Long id, AmostraDTO dto) {
        Amostra amostra = amostraRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Amostra não encontrada"));
        return salvarOuAtualizar(amostra, dto);
    }

    private AmostraDTO salvarOuAtualizar(Amostra amostra, AmostraDTO dto) {
        CargaConcreto carga = cargaConcretoRepository.findById(dto.getCargaId()).orElseThrow(() -> new EntityNotFoundException("Carga de concreto não encontrada"));

        ClasseResistencia resistencia = resistenciaRepository.findById(dto.getResistenciaProjetoId()).orElseThrow(() -> new EntityNotFoundException("Classe de resistência não encontrada"));

        List<IdadeCP> idades = dto.getIdadesEscolhidasIds().stream().map(idadeId -> idadeCPRepository.findById(idadeId).orElseThrow(() -> new EntityNotFoundException("Idade CP não encontrada: " + idadeId))).collect(Collectors.toList());

        amostra.setIdAmostra(dto.getIdAmostra());
        amostra.setDataRetirada(dto.getDataRetirada());
        amostra.setCarga(carga);
        amostra.setResistenciaProjeto(resistencia);
        amostra.setIdadesEscolhidas(idades);

        amostra = amostraRepository.save(amostra);
        return toDTO(amostra);
    }

    @Transactional(readOnly = true)
    public AmostraDTO buscarPorId(Long id) {
        return amostraRepository.findById(id).map(this::toDTO).orElseThrow(() -> new EntityNotFoundException("Amostra não encontrada"));
    }

    @Transactional(readOnly = true)
    public Page<AmostraDTO> listar(Pageable pageable) {
        return amostraRepository.findAll(pageable).map(this::toDTO);
    }

    @Transactional(readOnly = true)
    public Page<AmostraDTO> listarPorCarga(Long cargaId, Pageable pageable) {
        return amostraRepository.findByCargaId(cargaId, pageable).map(this::toDTO);
    }

    public void deleteById(Long amostraId) {
        amostraRepository.deleteById(amostraId);
    }

    private AmostraDTO toDTO(Amostra amostra) {
        AmostraDTO dto = new AmostraDTO();
        dto.setId(amostra.getId());
        dto.setIdAmostra(amostra.getIdAmostra());
        dto.setDataRetirada(amostra.getDataRetirada());
        dto.setCargaId(amostra.getCarga().getId());
        dto.setResistenciaProjetoId(amostra.getResistenciaProjeto().getId());

        if (amostra.getIdadesEscolhidas() != null) {
            dto.setIdadesEscolhidasIds(amostra.getIdadesEscolhidas().stream().map(IdadeCP::getId).collect(Collectors.toList()));
        }

        if (amostra.getEnsaios() != null) {
            dto.setEnsaiosIds(amostra.getEnsaios().stream().map(ensaio -> ensaio.getId()).collect(Collectors.toList()));
        }

        return dto;
    }
}
