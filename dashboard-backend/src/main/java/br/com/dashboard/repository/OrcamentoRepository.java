package br.com.dashboard.repository;

import br.com.dashboard.entity.Orçamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrcamentoRepository extends JpaRepository<Orçamento, Long> {
    // Métodos personalizados podem ser adicionados aqui
}
