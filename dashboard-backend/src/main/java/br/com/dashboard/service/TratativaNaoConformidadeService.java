package br.com.dashboard.service;

import br.com.dashboard.repository.TratativaNaoConformidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TratativaNaoConformidadeService {

    @Autowired
    private TratativaNaoConformidadeRepository tratativaNaoConformidadeRepository;

}
