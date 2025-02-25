package br.com.dashboard.repository;

import br.com.dashboard.entity.Ensaio;
import br.com.dashboard.enums.StatusEnsaio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EnsaioRepository extends JpaRepository<Ensaio, Long> {
    long countByStatus(StatusEnsaio status);
    
    long countByStatusAndDataEnsaio(StatusEnsaio status, LocalDate dataEnsaio);
    
    List<Ensaio> findByDataEnsaioBetweenAndStatus(LocalDate dataInicial, LocalDate dataFinal, StatusEnsaio status);
    
    @Query("SELECT e.status as status, COUNT(e) as quantidade FROM Ensaio e GROUP BY e.status")
    List<StatusCount> countByStatusGroupByStatus();
    
    interface StatusCount {
        StatusEnsaio getStatus();
        Long getQuantidade();
    }
}
