package br.com.dashboard.service;

import br.com.dashboard.repository.RelatorioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RelatorioService {

    @Autowired
    private RelatorioRepository relatorioRepository;

}
