package com.example.demo.ai.prescription.util;

import org.springframework.stereotype.Component;

@Component
public class MedicineNameNormalizer {

    public String normalize(String medicineName) {

        if (medicineName == null) {
            return "";
        }

        // Remove extra spaces
        String name = medicineName.trim();

        // Remove common prescription prefixes
        name = name.replaceFirst(
                "(?i)^syp\\.?\\s+",
                ""
        );

        name = name.replaceFirst(
                "(?i)^syrup\\.?\\s+",
                ""
        );

        name = name.replaceFirst(
                "(?i)^tab\\.?\\s+",
                ""
        );

        name = name.replaceFirst(
                "(?i)^tablet\\.?\\s+",
                ""
        );

        name = name.replaceFirst(
                "(?i)^cap\\.?\\s+",
                ""
        );

        name = name.replaceFirst(
                "(?i)^capsule\\.?\\s+",
                ""
        );

        // Remove dosage information after the medicine name
        name = name.replaceAll(
                "(?i)\\s+\\d+(\\.\\d+)?\\s*(ml|mg|g|mcg)\\b.*$",
                ""
        );

        // Remove unnecessary punctuation
        name = name.replaceAll(
                "[,;:]+$",
                ""
        );

        // Remove multiple spaces
        name = name.replaceAll(
                "\\s+",
                " "
        );

        return name.trim();
    }
}