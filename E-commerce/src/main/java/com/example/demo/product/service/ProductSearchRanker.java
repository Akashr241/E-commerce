package com.example.demo.product.service;

import com.example.demo.product.entity.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductSearchRanker {

    public int calculateScore(
            String searchName,
            Product product) {

        if (searchName == null || product == null) {
            return 0;
        }

        String search = searchName
                .trim()
                .toLowerCase();

        String productName = product.getName();

        if (productName == null) {
            return 0;
        }

        productName = productName
                .trim()
                .toLowerCase();

        int score = 0;

        if (productName.equals(search)) {

            score += 100;

        } else if (productName.startsWith(search)) {

            score += 70;

        } else if (productName.contains(search)) {

            score += 50;
        }

        String[] searchWords = search.split("\\s+");

        for (String word : searchWords) {

            if (word.length() < 2) {
                continue;
            }

            if (productName.contains(word)) {
                score += 10;
            }
        }

        if (search.contains("syrup")
                && productName.contains("syrup")) {

            score += 20;
        }

        if (search.contains("tablet")
                && productName.contains("tablet")) {

            score += 20;
        }

        if (search.contains("inhaler")
                && productName.contains("inhaler")) {

            score += 20;
        }

        if (search.contains("respules")
                && productName.contains("respules")) {

            score += 20;
        }

        if (search.contains("capsule")
                && productName.contains("capsule")) {

            score += 20;
        }

        if (search.contains("drops")
                && productName.contains("drops")) {

            score += 20;
        }

        return score;
    }
}