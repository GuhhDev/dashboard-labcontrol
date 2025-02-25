package br.com.dashboard.controller;

import br.com.dashboard.service.NaoConformidadeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/nao-conformidades")
public class NaoConformidadeController {

    @Autowired
    private NaoConformidadeService naoConformidadeService;

}
