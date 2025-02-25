package br.com.dashboard.controller;

import br.com.dashboard.service.ConcreteiraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/concreteiras")
public class ConcreteiraController {

    @Autowired
    private ConcreteiraService concreteiraService;

}
