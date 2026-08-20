package com.example.demo.ai.prescription.repository;

import com.example.demo.ai.prescription.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {

        List<Medicine> findByNameIgnoreCaseAndDiscontinuedFalse(
            String name
    );

    List<Medicine> findByNameContainingIgnoreCaseAndDiscontinuedFalse(
            String name
    );

    List<Medicine> findTop10ByNameContainingIgnoreCase(String name);

    List<Medicine> findTop10ByNameStartingWithIgnoreCase(String name);

}