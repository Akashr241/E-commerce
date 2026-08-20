package com.example.demo.ai.prescription.service;

import com.example.demo.ai.prescription.dto.MedicineResponseDto;
import com.example.demo.ai.prescription.entity.Medicine;
import com.example.demo.ai.prescription.repository.MedicineRepository;
import com.example.demo.ai.prescription.util.MedicineSearchRanker;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class MedicineServiceImpl implements MedicineService {

    private final MedicineRepository medicineRepository;
    private final MedicineSearchRanker medicineSearchRanker;

    public MedicineServiceImpl(
            MedicineRepository medicineRepository,
            MedicineSearchRanker medicineSearchRanker) {

        this.medicineRepository = medicineRepository;
        this.medicineSearchRanker = medicineSearchRanker;
    }

    @Override
    public List<MedicineResponseDto> searchMedicine(String name) {

        if (name == null || name.trim().isEmpty()) {
            return List.of();
        }

String SearchName = name.trim();

        System.out.println("=================================");
        System.out.println("MEDICINE SEARCH");
        System.out.println("Search: " + SearchName);
        System.out.println("=================================");

        // Get medicines from database
        List<Medicine> medicines =
                medicineRepository
                        .findByNameContainingIgnoreCaseAndDiscontinuedFalse(
                                SearchName
                        );

        System.out.println(
                "Database results: " + medicines.size()
        );

        // Rank medicines
        medicines.sort(
                Comparator.comparingInt(
                        (Medicine medicine) ->
                                medicineSearchRanker
                                        .calculateScore(name, medicine)
                ).reversed()
        );

        // Print ranking for debugging
        System.out.println("========== RANKING ==========");

        for (Medicine medicine : medicines) {

            int score =
                    medicineSearchRanker.calculateScore(
                            name,
                            medicine
                    );

            System.out.println(
                    medicine.getName()
                            + " --> Score: "
                            + score
            );
        }

        System.out.println("=============================");

        // Return only top 10
        return medicines.stream()
                .limit(10)
                .map(this::convertToDto)
                .toList();
    }

    private MedicineResponseDto convertToDto(
            Medicine medicine) {

        MedicineResponseDto dto =
                new MedicineResponseDto();

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