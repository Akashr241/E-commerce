package com.example.demo.ai.prescription.service;

import com.example.demo.ai.prescription.dto.MedicineResponseDto;
import com.example.demo.ai.prescription.entity.Medicine;
import com.example.demo.ai.prescription.repository.MedicineRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineServiceImpl implements MedicineService {

    private final MedicineRepository medicineRepository;

    public MedicineServiceImpl(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    @Override
    public List<MedicineResponseDto> searchMedicine(String name) {

        if (name == null || name.trim().isEmpty()) {
            return List.of();
        }

        name = name.trim();

        // 1. Exact match
        List<Medicine> exactMatches =
                medicineRepository
                        .findByNameIgnoreCaseAndDiscontinuedFalse(name);

        if (!exactMatches.isEmpty()) {

            return exactMatches.stream()
                    .map(this::convertToDto)
                    .toList();
        }

        // 2. Partial match
        List<Medicine> partialMatches =
                medicineRepository
                        .findByNameContainingIgnoreCaseAndDiscontinuedFalse(
                                name
                        );

        return partialMatches.stream()
                .limit(10)
                .map(this::convertToDto)
                .toList();
    }

    private MedicineResponseDto convertToDto(Medicine medicine) {

        MedicineResponseDto dto = new MedicineResponseDto();

        dto.setId(medicine.getId());
        dto.setName(medicine.getName());
        dto.setPrice(medicine.getPrice());

        dto.setDiscontinued(
                medicine.getDiscontinued()
        );

        dto.setManufacturerName(
                medicine.getManufacturerName()
        );

        dto.setType(
                medicine.getType()
        );

        dto.setPackSizeLabel(
                medicine.getPackSizeLabel()
        );

        dto.setShortComposition1(
                medicine.getShortComposition1()
        );

        dto.setShortComposition2(
                medicine.getShortComposition2()
        );

        return dto;
    }
}