package br.com.dashboard.service;

import br.com.dashboard.dto.EnsaioDTO;
import br.com.dashboard.entity.Amostra;
import br.com.dashboard.entity.Ensaio;
import br.com.dashboard.entity.IdadeCP;
import br.com.dashboard.repository.AmostraRepository;
import br.com.dashboard.repository.EnsaioRepository;
import br.com.dashboard.repository.IdadeCPRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EnsaioService {

    @Autowired
    private EnsaioRepository ensaioRepository;

    @Autowired
    private AmostraRepository amostraRepository;

    @Autowired
    private IdadeCPRepository idadeCPRepository;

    @Transactional
    public EnsaioDTO.Response criar(EnsaioDTO.Request request) {
        Amostra amostra = amostraRepository.findById(request.getAmostraId())
                .orElseThrow(() -> new EntityNotFoundException("Amostra não encontrada"));

        IdadeCP idadeCP = idadeCPRepository.findById(request.getIdadeCPId())
                .orElseThrow(() -> new EntityNotFoundException("Idade CP não encontrada"));

        Ensaio ensaio = new Ensaio();
        ensaio.setDataEnsaio(request.getDataEnsaio());
        ensaio.setResultado(request.getResultado());
        ensaio.setFormaRuptura(request.getFormaRuptura());
        ensaio.setDesvioPadrao(request.getDesvioPadrao());
        ensaio.setCoeficienteVariacao(request.getCoeficienteVariacao());
        ensaio.setFotosUrls(request.getFotosUrls());
        ensaio.setStatus(request.getStatus());
        ensaio.setResultadoAvaliacao(request.getResultadoAvaliacao());
        ensaio.setAmostra(amostra);
        ensaio.setIdadeCP(idadeCP);

        ensaio = ensaioRepository.save(ensaio);
        return toResponse(ensaio);
    }

    @Transactional
    public EnsaioDTO.Response atualizar(Long id, EnsaioDTO.Request request) {
        Ensaio ensaio = ensaioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ensaio não encontrado"));

        Amostra amostra = amostraRepository.findById(request.getAmostraId())
                .orElseThrow(() -> new EntityNotFoundException("Amostra não encontrada"));

        IdadeCP idadeCP = idadeCPRepository.findById(request.getIdadeCPId())
                .orElseThrow(() -> new EntityNotFoundException("Idade CP não encontrada"));

        ensaio.setDataEnsaio(request.getDataEnsaio());
        ensaio.setResultado(request.getResultado());
        ensaio.setFormaRuptura(request.getFormaRuptura());
        ensaio.setDesvioPadrao(request.getDesvioPadrao());
        ensaio.setCoeficienteVariacao(request.getCoeficienteVariacao());
        ensaio.setFotosUrls(request.getFotosUrls());
        ensaio.setStatus(request.getStatus());
        ensaio.setResultadoAvaliacao(request.getResultadoAvaliacao());
        ensaio.setAmostra(amostra);
        ensaio.setIdadeCP(idadeCP);

        ensaio = ensaioRepository.save(ensaio);
        return toResponse(ensaio);
    }

    @Transactional(readOnly = true)
    public EnsaioDTO.Response buscarPorId(Long id) {
        return ensaioRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new EntityNotFoundException("Ensaio não encontrado"));
    }

    @Transactional(readOnly = true)
    public Page<EnsaioDTO.ListResponse> listar(Pageable pageable) {
        return ensaioRepository.findAll(pageable)
                .map(this::toListResponse);
    }

    @Transactional
    public void deletar(Long id) {
        if (!ensaioRepository.existsById(id)) {
            throw new EntityNotFoundException("Ensaio não encontrado");
        }
        ensaioRepository.deleteById(id);
    }

    private EnsaioDTO.Response toResponse(Ensaio ensaio) {
        EnsaioDTO.Response response = new EnsaioDTO.Response();
        response.setId(ensaio.getId());
        response.setDataEnsaio(ensaio.getDataEnsaio());
        response.setResultado(ensaio.getResultado());
        response.setFormaRuptura(ensaio.getFormaRuptura());
        response.setDesvioPadrao(ensaio.getDesvioPadrao());
        response.setCoeficienteVariacao(ensaio.getCoeficienteVariacao());
        response.setFotosUrls(ensaio.getFotosUrls());
        response.setStatus(ensaio.getStatus());
        response.setResultadoAvaliacao(ensaio.getResultadoAvaliacao());

        if (ensaio.getAmostra() != null) {
            response.setAmostraId(ensaio.getAmostra().getId());
            response.setIdAmostra(ensaio.getAmostra().getIdAmostra());
        }

        if (ensaio.getIdadeCP() != null) {
            response.setIdadeCPId(ensaio.getIdadeCP().getId());
            response.setDiasIdadeCP(ensaio.getIdadeCP().getDias());
        }

        return response;
    }

    private EnsaioDTO.ListResponse toListResponse(Ensaio ensaio) {
        EnsaioDTO.ListResponse response = new EnsaioDTO.ListResponse();
        response.setId(ensaio.getId());
        response.setDataEnsaio(ensaio.getDataEnsaio());
        response.setResultado(ensaio.getResultado());
        response.setStatus(ensaio.getStatus());
        response.setResultadoAvaliacao(ensaio.getResultadoAvaliacao());

        if (ensaio.getIdadeCP() != null) {
            response.setDiasIdadeCP(ensaio.getIdadeCP().getDias());
        }

        return response;
    }
}
