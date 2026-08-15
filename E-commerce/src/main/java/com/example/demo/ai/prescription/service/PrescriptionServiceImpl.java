package com.example.demo.ai.prescription.service;

import com.example.demo.ai.chatbot.client.GeminiClient;
import com.example.demo.ai.chatbot.service.AiService;
import com.example.demo.ai.prescription.client.FDAClient;

import com.example.demo.ai.prescription.dto.FDAMedicineDto;
import com.example.demo.ai.prescription.util.MedicineNameNormalizer;
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
    private final MedicineNameNormalizer normalizer;

    public PrescriptionServiceImpl(
            GeminiClient geminiClient,
            AiService aiService,
            FDAClient fdaClient,
            ObjectMapper objectMapper,
            MedicineNameNormalizer normalizer) {

        this.geminiClient = geminiClient;
        this.aiService = aiService;
        this.fdaClient = fdaClient;
        this.objectMapper = objectMapper;
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

        // 1. Gemini identifies medicine names
        String aiResult = geminiClient.askGemini(
                """
                          You are a medical prescription OCR correction assistant.

        The text below was extracted from a handwritten doctor's
        prescription using OCR. OCR may contain spelling mistakes,
        missing characters, extra characters, or incorrectly recognized
        characters.

        Your task is to identify the MEDICINE BRAND NAMES only.


         IMPORTANT RULES:

        1. Correct obvious OCR errors in medicine names.
        2. Use the surrounding prescription context to understand
           whether a word is actually a medicine name.
        3. Preserve the actual medicine name as much as possible.
        4. Do NOT invent a medicine name.
        5. Do NOT replace a medicine with a similar-sounding medicine
           unless the OCR evidence strongly supports it.
        6. Dosage such as 3 mL, 5 mL, 500 mg must NOT be included.
        7. Words such as Syp, Syrup, Tab, Tablet, Cap, Capsule are
           medicine-form instructions, not medicine names.
        8. Return ONLY medicine brand names.
        9. Return exactly ONE medicine name per line.
        10. Do not provide explanations.
        11. Do not return dosage, frequency, duration, or diagnosis.

        OCR PRESCRIPTION:
                        """
                + extractedText
        );

        System.out.println(
                "========== GEMINI RESULT =========="
        );

        System.out.println(aiResult);

        System.out.println(
                "==================================="
        );

        // 2. Split medicines
        String[] medicines = aiResult.split("\\R");

        List<FDAMedicineDto> fdaResults = new ArrayList<>();

        // 3. Process each medicine
        for (String medicineName : medicines) {

            medicineName = medicineName.trim();

            if (medicineName.isEmpty()) {
                continue;
            }

            System.out.println(
                    "========== NORMALIZED LOGIC =========="
            );

            System.out.println(
                    "Original Medicine: " + medicineName
            );

            // Normalize
            String normalizedName =
                    normalizer.normalize(medicineName);

            System.out.println(
                    "Normalized Medicine: " + normalizedName
            );

            // 4. Search FDA
            System.out.println(
                    "========== FDA SEARCH =========="
            );

            System.out.println(
                    "Searching FDA for: " + normalizedName
            );

            FDAMedicineDto fdaResult =
                    fdaClient.searchMedicine(normalizedName);

            if (fdaResult != null) {

                fdaResults.add(fdaResult);

                System.out.println(
                        "FDA RESULT FOUND"
                );

            } else {

                System.out.println(
                        "FDA RESULT NOT FOUND: "
                        + normalizedName
                );
            }

            System.out.println(
                    "================================"
            );
        }

        // 5. Return all FDA results
        try {

            return objectMapper.writeValueAsString(
                    fdaResults
            );

        } catch (JsonProcessingException e) {

            e.printStackTrace();

            return """
                    {
            "message": "Error processing FDA results"
                    }
                    """;
        }
    }
}