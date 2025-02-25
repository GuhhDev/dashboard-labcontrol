package br.com.dashboard.repository;

import br.com.dashboard.entity.Amostra;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AmostraRepository extends JpaRepository<Amostra, Long> {

    Page<Amostra> findByCargaId(Long cargaId, Pageable pageable);

    void deleteById(Long id);
}
