package br.com.dashboard.repository;

import br.com.dashboard.entity.ClasseResistencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClasseResistenciaRepository extends JpaRepository<ClasseResistencia, Long> {
}
