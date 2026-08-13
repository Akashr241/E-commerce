package com.example.demo.ai.prescription.service;

import com.example.demo.ai.chatbot.client.GeminiClient;
import com.example.demo.ai.chatbot.service.AiService;
import com.example.demo.ai.prescription.client.FDAClient;
import com.example.demo.ai.prescription.dto.FDAMedicineDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PrescriptionServiceImpl implements PrescriptionService {

    private final GeminiClient geminiClient;
    private final AiService aiService;
    private final FDAClient fdaClient;
    private final ObjectMapper objectMapper;

    public PrescriptionServiceImpl(
            GeminiClient geminiClient,
            AiService aiService,
            FDAClient fdaClient,
            ObjectMapper objectMapper) {

        this.geminiClient = geminiClient;
        this.aiService = aiService;
        this.fdaClient = fdaClient;
        this.objectMapper = objectMapper;
    }

    @Override
    public String analyzePrescription(String extractedText) {

        // ==============================
        // STEP 1: OCR TEXT
        // ==============================

        System.out.println("========== PRESCRIPTION SERVICE ==========");
        System.out.println("OCR TEXT:");
        System.out.println(extractedText);
        System.out.println("==========================================");


        // ==============================
        // STEP 2: SEND TEXT TO GEMINI
        // ==============================

        String aiResult = geminiClient.askGemini(
                "Analyze this doctor's prescription and identify "
                + "the medicine names.\n\n"
                + "Return only medicine names, "
                + "one medicine per line, "
                + "without explanation or additional text.\n\n"
                + extractedText
        );

        System.out.println("========== GEMINI RESULT ==========");
        System.out.println(aiResult);
        System.out.println("===================================");


        // ==============================
        // STEP 3: SPLIT MEDICINE NAMES
        // ==============================

        String[] medicines = aiResult.split("\\R");

        // Store all FDA results
        List<FDAMedicineDto> fdaResults = new ArrayList<>();


        // ==============================
        // STEP 4: SEARCH FDA
        // ==============================

        for (String medicineName : medicines) {

            medicineName = medicineName.trim();

            // Ignore empty lines
            if (medicineName.isEmpty()) {
                continue;
            }

            System.out.println("========== FDA SEARCH ==========");
            System.out.println("Searching FDA for: " + medicineName);


            try {

                FDAMedicineDto fdaResult =
                        fdaClient.searchMedicine(medicineName);

                // Add FDA result to list
                fdaResults.add(fdaResult);

                System.out.println("FDA RESULT RECEIVED");
                System.out.println("Medicine: " + medicineName);
                System.out.println("================================");

            } catch (Exception e) {

                System.out.println("========== FDA ERROR ==========");
                System.out.println("Medicine: " + medicineName);
                System.out.println("Error: " + e.getMessage());
                System.out.println("================================");
            }
        }


        // ==============================
        // STEP 5: RETURN FINAL JSON
        // ==============================

        try {

            return objectMapper.writeValueAsString(fdaResults);

        } catch (JsonProcessingException e) {

            System.out.println(
                    "ERROR CONVERTING FDA RESULTS TO JSON"
            );

            e.printStackTrace();

            return "{\"message\":\"Unable to create FDA response\"}";
        }
    }
}