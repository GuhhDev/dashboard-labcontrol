package br.com.dashboard.repository;

import br.com.dashboard.entity.Concreteira;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConcreteiraRepository extends JpaRepository<Concreteira, Long> {
}
