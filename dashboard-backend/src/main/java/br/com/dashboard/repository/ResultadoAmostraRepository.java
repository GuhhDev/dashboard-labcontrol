package br.com.dashboard.repository;

import br.com.dashboard.entity.ResultadoAmostra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResultadoAmostraRepository extends JpaRepository<ResultadoAmostra, Long> {
}
