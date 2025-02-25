package br.com.dashboard.service;

import br.com.dashboard.repository.ResultadoAmostraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResultadoAmostraService {

    @Autowired
    private ResultadoAmostraRepository resultadoAmostraRepository;

}
