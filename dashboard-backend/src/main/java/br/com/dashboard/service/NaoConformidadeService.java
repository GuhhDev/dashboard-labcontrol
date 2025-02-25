package br.com.dashboard.service;

import br.com.dashboard.repository.NaoConformidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NaoConformidadeService {

    @Autowired
    private NaoConformidadeRepository naoConformidadeRepository;

}
