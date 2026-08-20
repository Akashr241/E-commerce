package com.example.demo.ai.prescription.util;

import com.example.demo.ai.prescription.entity.Medicine;
import org.springframework.stereotype.Component;

@Component
public class MedicineSearchRanker {

    public int calculateScore(
            String searchName,
            Medicine medicine) {

        if (searchName == null || medicine == null) {
            return 0;
        }

        String search = searchName
                .trim()
                .toLowerCase();

        String medicineName = medicine.getName();

        if (medicineName == null) {
            return 0;
        }

        medicineName = medicineName
                .trim()
                .toLowerCase();

        int score = 0;


        // =====================================
        // 1. EXACT NAME
        // =====================================

        if (medicineName.equals(search)) {

            score += 100;

        }


        // =====================================
        // 2. STARTS WITH SEARCH
        // =====================================

        else if (medicineName.startsWith(search)) {

            score += 70;

        }


        // =====================================
        // 3. CONTAINS SEARCH
        // =====================================

        else if (medicineName.contains(search)) {

            score += 50;

        }


        // =====================================
        // 4. WORD MATCHING
        // =====================================

        String[] searchWords =
                search.split("\\s+");

        for (String word : searchWords) {

            if (word.length() < 2) {
                continue;
            }

            if (medicineName.contains(word)) {

                score += 10;
            }
        }


        // =====================================
        // 5. DOSAGE FORM MATCHING
        // =====================================

        if (search.contains("syrup")
                && medicineName.contains("syrup")) {

            score += 20;
        }

        if (search.contains("tablet")
                && medicineName.contains("tablet")) {

            score += 20;
        }

        if (search.contains("inhaler")
                && medicineName.contains("inhaler")) {

            score += 20;
        }

        if (search.contains("respules")
                && medicineName.contains("respules")) {

            score += 20;
        }

        if (search.contains("capsule")
                && medicineName.contains("capsule")) {

            score += 20;
        }

        if (search.contains("drops")
                && medicineName.contains("drops")) {

            score += 20;
        }


        return score;
    }
}