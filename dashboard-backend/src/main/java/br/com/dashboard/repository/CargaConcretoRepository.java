package br.com.dashboard.repository;

import br.com.dashboard.entity.CargaConcreto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CargaConcretoRepository extends JpaRepository<CargaConcreto, Long> {
    Page<CargaConcreto> findByObraId(Long obraId, Pageable pageable);
}
