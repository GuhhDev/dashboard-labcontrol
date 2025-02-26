package br.com.dashboard.repository;

import br.com.dashboard.entity.OrçamentoRealizado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrcamentoRealizadoRepository extends JpaRepository<OrçamentoRealizado, Long> {
    // Métodos personalizados podem ser adicionados aqui
}
