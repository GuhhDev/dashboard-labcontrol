package br.com.dashboard.service;

import br.com.dashboard.repository.ConcreteiraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConcreteiraService {

    @Autowired
    private ConcreteiraRepository concreteiraRepository;

}
