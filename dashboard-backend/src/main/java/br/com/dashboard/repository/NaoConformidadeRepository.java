package br.com.dashboard.repository;

import br.com.dashboard.entity.NaoConformidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NaoConformidadeRepository extends JpaRepository<NaoConformidade, Long> {
}
