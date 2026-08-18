package com.example.demo.ai.prescription.service;

import com.example.demo.ai.prescription.dto.MedicineResponseDto;
import com.example.demo.ai.prescription.entity.Medicine;
import com.example.demo.ai.prescription.repository.MedicineRepository;
import com.example.demo.ai.prescription.util.MedicineNameNormalizer;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineServiceImpl implements MedicineService {

    private final MedicineRepository medicineRepository;
    private final MedicineNameNormalizer normalizer;

    public MedicineServiceImpl(
            MedicineRepository medicineRepository,
            MedicineNameNormalizer normalizer) {

        this.medicineRepository = medicineRepository;
        this.normalizer = normalizer;
    }

    @Override
    public List<MedicineResponseDto> searchMedicine(String medicineName) {

        // 1. Normalize medicine name
        String normalizedName =
                normalizer.normalize(medicineName);

        System.out.println(
                "Original Medicine: " + medicineName
        );

        System.out.println(
                "Normalized Medicine: " + normalizedName
        );

        // 2. Search database
        List<Medicine> medicines =
                medicineRepository
                        .findTop10ByNameContainingIgnoreCase(
                                normalizedName
                        );

        // 3. Convert Entity → DTO
        return medicines.stream()
                .map(this::convertToDto)
                .toList();
    }

    private MedicineResponseDto convertToDto(
            Medicine medicine) {

        return new MedicineResponseDto(
                medicine.getId(),
                medicine.getName(),
                medicine.getPrice(),
                medicine.getDiscontinued(),
                medicine.getManufacturerName(),
                medicine.getType(),
                medicine.getPackSizeLabel(),
                medicine.getShortComposition1(),
                medicine.getShortComposition2()
        );
    }
}