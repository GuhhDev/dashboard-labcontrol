package br.com.dashboard.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class IdadeCP {
    @Id
    @GeneratedValue
    private Long id;
    private Integer dias;
}