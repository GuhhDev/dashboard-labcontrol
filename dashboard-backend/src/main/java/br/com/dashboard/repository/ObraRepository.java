package br.com.dashboard.repository;

import br.com.dashboard.entity.Obra;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ObraRepository extends JpaRepository<Obra, Long> {
    Page<Obra> findByClienteId(Long clienteId, Pageable pageable);
}
