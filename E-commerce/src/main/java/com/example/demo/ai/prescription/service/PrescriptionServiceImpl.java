package com.example.demo.ai.prescription.service;

import com.example.demo.ai.chatbot.client.GeminiClient;
import com.example.demo.ai.chatbot.service.AiService;
import com.example.demo.ai.prescription.util.MedicineNameNormalizer;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.demo.ai.prescription.dto.MedicineResponseDto;
import com.example.demo.ai.prescription.service.MedicineService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PrescriptionServiceImpl implements PrescriptionService {

    private final GeminiClient geminiClient;
    private final AiService aiService;
    private final ObjectMapper objectMapper;
    private final MedicineService medicineService;
    private final MedicineNameNormalizer normalizer;

    public PrescriptionServiceImpl(
            GeminiClient geminiClient,
            AiService aiService,
            ObjectMapper objectMapper,
            MedicineService medicineService,
            MedicineNameNormalizer normalizer) {

        this.geminiClient = geminiClient;
        this.aiService = aiService;
        this.objectMapper = objectMapper;
        this.medicineService = medicineService;
        this.normalizer = normalizer;
    }

@Override
public String analyzePrescription(String extractedText) {

    System.out.println(
            "========== PRESCRIPTION SERVICE =========="
    );

    System.out.println("OCR TEXT:");
    System.out.println(extractedText);

    System.out.println(
            "=========================================="
    );


    // ================================
    // STEP 1: GEMINI
    // ================================

    String aiResult = geminiClient.askGemini(

            "Analyze this doctor's prescription.\n\n"

            + "Identify every medicine prescribed.\n"

            + "OCR text may contain spelling mistakes.\n"

            + "Correct obvious OCR mistakes using medical context.\n"

            + "Return ONLY the medicine names.\n"

            + "Return one medicine per line.\n"

            + "Do not include explanations.\n"

            + "Do not include dosage instructions.\n"

            + "Do not include numbering.\n\n"

            + "Prescription OCR:\n"

            + extractedText
    );


    System.out.println(
            "========== GEMINI RESULT =========="
    );

    System.out.println(aiResult);


    // ================================
    // STEP 2: SPLIT MEDICINES
    // ================================

    String[] medicines =
            aiResult.split("\\R");


    List<MedicineResponseDto> finalResults =
            new ArrayList<>();


    // ================================
    // STEP 3: SEARCH DATABASE
    // ================================

    for (String medicineName : medicines) {

        medicineName = medicineName.trim();

        if (medicineName.isEmpty()) {
            continue;
        }


        System.out.println(
                "========== MEDICINE =========="
        );

        System.out.println(
                "Gemini Medicine: "
                        + medicineName
        );


        // ================================
        // NORMALIZATION
        // ================================

        String normalizedName =
                normalizer.normalize(
                        medicineName
                );

        System.out.println(
                "Normalized Medicine: "
                        + normalizedName
        );


        // ================================
        // DATABASE SEARCH + RANKING
        // ================================

        List<MedicineResponseDto> results =
                medicineService.searchMedicine(
                        normalizedName
                );


        System.out.println(
                "Database Matches: "
                        + results.size()
        );


        // ================================
        // BEST MATCH
        // ================================

        if (!results.isEmpty()) {

            MedicineResponseDto bestMedicine =
                    results.get(0);

            finalResults.add(
                    bestMedicine
            );

            System.out.println(
                    "BEST MATCH: "
                            + bestMedicine.getName()
            );

        } else {

            System.out.println(
                    "NO MEDICINE FOUND"
            );
        }
    }


    // ================================
    // STEP 4: RETURN JSON
    // ================================

    try {

        return objectMapper.writeValueAsString(
                finalResults
        );

    } catch (JsonProcessingException e) {

        System.out.println(
                "ERROR CONVERTING MEDICINE RESULTS TO JSON"
        );

        e.printStackTrace();

        return "{\"message\":\"Unable to create medicine response\"}";
    }
}
}