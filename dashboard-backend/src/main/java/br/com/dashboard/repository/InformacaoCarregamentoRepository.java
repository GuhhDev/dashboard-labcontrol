package br.com.dashboard.repository;

import br.com.dashboard.entity.InformacaoCarregamento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InformacaoCarregamentoRepository extends JpaRepository<InformacaoCarregamento, Long> {
}
