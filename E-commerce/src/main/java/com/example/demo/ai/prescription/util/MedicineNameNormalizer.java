package com.example.demo.ai.prescription.util;

import org.springframework.stereotype.Component;

@Component
public class MedicineNameNormalizer {

    public String normalize(String medicineName) {

        if (medicineName == null) {
            return "";
        }

        String name = medicineName.trim();

        // Remove prescription prefixes
        name = name.replaceFirst("(?i)^syp\\.?\\s+", "");
        name = name.replaceFirst("(?i)^syrup\\.?\\s+", "");
        name = name.replaceFirst("(?i)^tab\\.?\\s+", "");
        name = name.replaceFirst("(?i)^tablet\\.?\\s+", "");
        name = name.replaceFirst("(?i)^cap\\.?\\s+", "");
        name = name.replaceFirst("(?i)^capsule\\.?\\s+", "");

        // Remove dosage
        name = name.replaceAll(
                "(?i)\\s+\\d+(\\.\\d+)?\\s*(ml|mg|g|mcg)\\b.*$",
                ""
        );

        // Remove punctuation
        name = name.replaceAll("[,;:]+$", "");

        // Remove extra spaces
        name = name.replaceAll("\\s+", " ");

        return name.trim();
    }
}