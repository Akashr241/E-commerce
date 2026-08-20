
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

        // 1. Exact medicine name
        if (medicineName.equals(search)) {
            score += 100;
        }

        // 2. Medicine name starts with search
        else if (medicineName.startsWith(search)) {
            score += 70;
        }

        // 3. Medicine name contains search
        else if (medicineName.contains(search)) {
            score += 50;
        }

        // 4. Check individual words
        String[] searchWords = search.split("\\s+");

        for (String word : searchWords) {

            if (word.length() < 2) {
                continue;
            }

            if (medicineName.contains(word)) {
                score += 10;
            }
        }

        return score;
    }
}