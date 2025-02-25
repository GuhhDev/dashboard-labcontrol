package br.com.dashboard.repository;

import br.com.dashboard.entity.IdadeCP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IdadeCPRepository extends JpaRepository<IdadeCP, Long> {
}
