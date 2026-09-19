package com.example.demo.ai.prescription.util;

import com.example.demo.ai.prescription.entity.Medicine;
import org.springframework.stereotype.Component;

@Component
public class MedicineSearchRanker {

    public int calculateScore(String searchName, Medicine medicine) {

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

        // Exact match
        if (medicineName.equals(search)) {
            return 100;
        }

        // Medicine name starts with search
        if (medicineName.startsWith(search)) {
            score += 70;
        }

        // Medicine name contains search
        else if (medicineName.contains(search)) {
            score += 50;
        }

        // Word matching
        String[] searchWords = search.split("\\s+");

        for (String word : searchWords) {

            if (word.length() < 2) {
                continue;
            }

            // Ignore common dosage/form words
            if (word.equals("syp")
                    || word.equals("syrup")
                    || word.equals("tab")
                    || word.equals("tablet")
                    || word.equals("cap")
                    || word.equals("capsule")) {
                continue;
            }

            if (medicineName.contains(word)) {
                score += 10;
            }
        }

        // Dosage form
        if (search.contains("syrup")
                && medicineName.contains("syrup")) {
            score += 20;
        }

        if (search.contains("tablet")
                && medicineName.contains("tablet")) {
            score += 20;
        }

        if (search.contains("capsule")
                && medicineName.contains("capsule")) {
            score += 20;
        }

        if (search.contains("inhaler")
                && medicineName.contains("inhaler")) {
            score += 20;
        }

        if (search.contains("drops")
                && medicineName.contains("drops")) {
            score += 20;
        }

        return score;
    }
}