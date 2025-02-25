package br.com.dashboard.service;

import br.com.dashboard.dto.CargaConcretoDTO;
import br.com.dashboard.dto.InformacaoCarregamentoDTO;
import br.com.dashboard.entity.*;
import br.com.dashboard.repository.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
public class CargaConcretoService {

    @Autowired
    private CargaConcretoRepository cargaConcretoRepository;

    @Autowired
    private ConcreteiraRepository concreteiraRepository;

    @Autowired
    private ObraRepository obraRepository;

    @Autowired
    private ClasseResistenciaRepository resistenciaRepository;

    @Autowired
    private InformacaoCarregamentoRepository informacaoCarregamentoRepository;

    @Transactional
    public CargaConcretoDTO criar(CargaConcretoDTO dto) {
        CargaConcreto carga = new CargaConcreto();
        return salvarOuAtualizar(carga, dto);
    }

    @Transactional
    public CargaConcretoDTO atualizar(Long id, CargaConcretoDTO dto) {
        CargaConcreto carga = cargaConcretoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Carga de concreto não encontrada"));
        return salvarOuAtualizar(carga, dto);
    }

    private CargaConcretoDTO salvarOuAtualizar(CargaConcreto carga, CargaConcretoDTO dto) {
        Concreteira concreteira = concreteiraRepository.findById(dto.getConcreteiraId())
                .orElseThrow(() -> new EntityNotFoundException("Concreteira não encontrada"));

        Obra obra = obraRepository.findById(dto.getObraId())
                .orElseThrow(() -> new EntityNotFoundException("Obra não encontrada"));

        ClasseResistencia resistencia = resistenciaRepository.findById(dto.getResistenciaId())
                .orElseThrow(() -> new EntityNotFoundException("Classe de resistência não encontrada"));

        carga.setNumeroCarga(dto.getNumeroCarga());
        carga.setData(dto.getData());
        carga.setNumeroNF(dto.getNumeroNF());
        carga.setVolumeConcreto(dto.getVolumeConcreto());
        carga.setHorarioChegada(dto.getHorarioChegada());
        carga.setHorarioSaida(dto.getHorarioSaida());
        carga.setSlump(dto.getSlump());
        carga.setMotorista(dto.getMotorista());
        carga.setCaminhao(dto.getCaminhao());
        carga.setLocalPecaConcretada(dto.getLocalPecaConcretada());
        carga.setEtiquetasPecas(dto.getEtiquetasPecas());
        carga.setRegistroProjeto(dto.getRegistroProjeto());
        carga.setFotosUrls(dto.getFotosUrls());
        carga.setConcreteira(concreteira);
        carga.setObra(obra);
        carga.setResistenciaConcreto(resistencia);

        if (dto.getInformacaoCarregamento() != null) {
            InformacaoCarregamento info = carga.getInformacaoCarregamento();
            if (info == null) {
                info = new InformacaoCarregamento();
            }
            info.setQuantidadeCimento(dto.getInformacaoCarregamento().getQuantidadeCimento());
            info.setQuantidadeAreia(dto.getInformacaoCarregamento().getQuantidadeAreia());
            info.setQuantidadeBrita0(dto.getInformacaoCarregamento().getQuantidadeBrita0());
            info.setQuantidadeBrita1(dto.getInformacaoCarregamento().getQuantidadeBrita1());
            info.setQuantidadeAgua(dto.getInformacaoCarregamento().getQuantidadeAgua());
            info.setQuantidadeAditivos(dto.getInformacaoCarregamento().getQuantidadeAditivos());
            info.setFatorAguaCimento(dto.getInformacaoCarregamento().getFatorAguaCimento());
            carga.setInformacaoCarregamento(info);
        }

        carga = cargaConcretoRepository.save(carga);
        return toDTO(carga);
    }

    @Transactional(readOnly = true)
    public CargaConcretoDTO buscarPorId(Long id) {
        return cargaConcretoRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Carga de concreto não encontrada"));
    }

    @Transactional(readOnly = true)
    public Page<CargaConcretoDTO> listar(Pageable pageable) {
        return cargaConcretoRepository.findAll(pageable).map(this::toDTO);
    }

    @Transactional(readOnly = true)
    public Page<CargaConcretoDTO> listarPorObra(Long obraId, Pageable pageable) {
        return cargaConcretoRepository.findByObraId(obraId, pageable).map(this::toDTO);
    }

    public void deleteById(Long cargaConcretoId) {
        cargaConcretoRepository.deleteById(cargaConcretoId);
    }

    private CargaConcretoDTO toDTO(CargaConcreto carga) {
        CargaConcretoDTO dto = new CargaConcretoDTO();
        dto.setId(carga.getId());
        dto.setNumeroCarga(carga.getNumeroCarga());
        dto.setData(carga.getData());
        dto.setNumeroNF(carga.getNumeroNF());
        dto.setVolumeConcreto(carga.getVolumeConcreto());
        dto.setHorarioChegada(carga.getHorarioChegada());
        dto.setHorarioSaida(carga.getHorarioSaida());
        dto.setSlump(carga.getSlump());
        dto.setMotorista(carga.getMotorista());
        dto.setCaminhao(carga.getCaminhao());
        dto.setLocalPecaConcretada(carga.getLocalPecaConcretada());
        dto.setEtiquetasPecas(carga.getEtiquetasPecas());
        dto.setRegistroProjeto(carga.getRegistroProjeto());
        dto.setFotosUrls(carga.getFotosUrls());
        dto.setConcreteiraId(carga.getConcreteira().getId());
        dto.setObraId(carga.getObra().getId());
        dto.setResistenciaId(carga.getResistenciaConcreto().getId());
        
        if (carga.getInformacaoCarregamento() != null) {
            InformacaoCarregamentoDTO infoDTO = new InformacaoCarregamentoDTO();
            infoDTO.setId(carga.getInformacaoCarregamento().getId());
            infoDTO.setQuantidadeCimento(carga.getInformacaoCarregamento().getQuantidadeCimento());
            infoDTO.setQuantidadeAreia(carga.getInformacaoCarregamento().getQuantidadeAreia());
            infoDTO.setQuantidadeBrita0(carga.getInformacaoCarregamento().getQuantidadeBrita0());
            infoDTO.setQuantidadeBrita1(carga.getInformacaoCarregamento().getQuantidadeBrita1());
            infoDTO.setQuantidadeAgua(carga.getInformacaoCarregamento().getQuantidadeAgua());
            infoDTO.setQuantidadeAditivos(carga.getInformacaoCarregamento().getQuantidadeAditivos());
            infoDTO.setFatorAguaCimento(carga.getInformacaoCarregamento().getFatorAguaCimento());
            dto.setInformacaoCarregamento(infoDTO);
        }

        if (carga.getAmostras() != null) {
            dto.setAmostrasIds(carga.getAmostras().stream()
                    .map(Amostra::getId)
                    .collect(Collectors.toList()));
        }

        return dto;
    }
}
