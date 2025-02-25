package br.com.dashboard.controller;

import br.com.dashboard.service.ResultadoAmostraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/resultados-amostra")
public class ResultadoAmostraController {

    @Autowired
    private ResultadoAmostraService resultadoAmostraService;

}
