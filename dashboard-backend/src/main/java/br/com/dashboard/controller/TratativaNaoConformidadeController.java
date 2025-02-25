package br.com.dashboard.controller;

import br.com.dashboard.service.TratativaNaoConformidadeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tratativas-nao-conformidade")
public class TratativaNaoConformidadeController {

    @Autowired
    private TratativaNaoConformidadeService tratativaNaoConformidadeService;

}
