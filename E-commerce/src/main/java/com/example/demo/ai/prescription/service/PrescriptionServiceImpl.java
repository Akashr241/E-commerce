package com.example.demo.ai.prescription.service;

import com.example.demo.ai.chatbot.client.GeminiClient;
import com.example.demo.ai.prescription.dto.PrescriptionResponseDto;
import com.example.demo.ai.prescription.util.MedicineNameNormalizer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PrescriptionServiceImpl
        implements PrescriptionService {

    private final GeminiClient geminiClient;
    private final ObjectMapper objectMapper;
    private final MedicineService medicineService;
    private final MedicineNameNormalizer normalizer;

    public PrescriptionServiceImpl(
            GeminiClient geminiClient,
            ObjectMapper objectMapper,
            MedicineService medicineService,
            MedicineNameNormalizer normalizer) {

        this.geminiClient = geminiClient;
        this.objectMapper = objectMapper;
        this.medicineService = medicineService;
        this.normalizer = normalizer;
    }


    @Override
    public List<PrescriptionResponseDto>
    analyzePrescription(String extractedText) {

        System.out.println(
                "========== PRESCRIPTION SERVICE =========="
        );

        System.out.println("OCR TEXT:");
        System.out.println(extractedText);

        System.out.println(
                "=========================================="
        );


        // ==========================================
        // STEP 1: GEMINI AI ANALYSIS
        // ==========================================

        String prompt = """

                You are a prescription analysis AI.

                Analyze the following OCR text extracted
                from a doctor's prescription.

                Identify every medicine prescribed.

                OCR text may contain spelling mistakes.
                Correct obvious OCR mistakes using medical context.

                For every medicine return:

                - medicineName
                - dosage
                - frequency
                - duration

                Return ONLY valid JSON.

                Do NOT return markdown.
                Do NOT return explanations.
                Do NOT use ```json.

                Return an array using exactly this format:

                [
                  {
                    "medicineName": "Calpol",
                    "dosage": "500mg",
                    "frequency": "twice daily",
                    "duration": "5 days"
                  }
                ]

                Rules:

                medicineName:
                The name of the medicine.

                dosage:
                The strength or dosage such as 500mg,
                5ml, etc.

                frequency:
                How often the medicine should be taken.

                duration:
                How long the medicine should be taken.

                Do not invent information.

                If information is not present,
                return an empty string.

                PRESCRIPTION OCR:
                """ + extractedText;


        String aiResult =
                geminiClient.askGemini(prompt);


        System.out.println(
                "========== GEMINI RESULT =========="
        );

        System.out.println(aiResult);


        // ==========================================
        // STEP 2: CLEAN GEMINI RESPONSE
        // ==========================================

        String cleanResult =
                cleanJson(aiResult);


        List<PrescriptionResponseDto> finalResults =
                new ArrayList<>();


        try {

            JsonNode medicines =
                    objectMapper.readTree(cleanResult);


            // ==========================================
            // STEP 3: PROCESS EACH MEDICINE
            // ==========================================

            for (JsonNode medicineNode : medicines) {

                String medicineName =
                        medicineNode
                                .path("medicineName")
                                .asText();

                String dosage =
                        medicineNode
                                .path("dosage")
                                .asText();

                String frequency =
                        medicineNode
                                .path("frequency")
                                .asText();

                String duration =
                        medicineNode
                                .path("duration")
                                .asText();


                if (medicineName == null ||
                        medicineName.trim().isEmpty()) {

                    continue;
                }


                System.out.println(
                        "========== MEDICINE =========="
                );

                System.out.println(
                        "Gemini Medicine: "
                                + medicineName
                );

                System.out.println(
                        "Dosage: " + dosage
                );

                System.out.println(
                        "Frequency: " + frequency
                );

                System.out.println(
                        "Duration: " + duration
                );


                // ======================================
                // STEP 4: NORMALIZE MEDICINE NAME
                // ======================================

                String normalizedName =
                        normalizer.normalize(
                                medicineName
                        );

                System.out.println(
                        "Normalized Medicine: "
                                + normalizedName
                );


                // ======================================
                // STEP 5: SEARCH DATABASE
                // ======================================

                var results =
                        medicineService.searchMedicine(
                                normalizedName
                        );


                System.out.println(
                        "Database Matches: "
                                + results.size()
                );


                // ======================================
                // STEP 6: BEST MATCH
                // ======================================

                if (!results.isEmpty()) {

                    var bestMedicine =
                            results.get(0);


                    PrescriptionResponseDto dto =
                            new PrescriptionResponseDto();


                    // AI information
                    dto.setMedicineName(
                            medicineName
                    );

                    dto.setDosage(
                            dosage
                    );

                    dto.setFrequency(
                            frequency
                    );

                    dto.setDuration(
                            duration
                    );


                    // Database information
                    dto.setProductId(
                            bestMedicine.getId()
                    );

                    dto.setProductName(
                            bestMedicine.getName()
                    );

                    dto.setPrice(
                            bestMedicine.getPrice()
                    );

                    dto.setManufacturerName(
                            bestMedicine.getManufacturerName()
                    );

                    dto.setType(
                            bestMedicine.getType()
                    );

                    dto.setPackSizeLabel(
                            bestMedicine.getPackSizeLabel()
                    );

                    dto.setShortComposition1(
                            bestMedicine.getShortComposition1()
                    );

                    dto.setShortComposition2(
                            bestMedicine.getShortComposition2()
                    );


                    finalResults.add(dto);


                    System.out.println(
                            "BEST MATCH: "
                                    + bestMedicine.getName()
                    );

                } else {

                    System.out.println(
                            "NO MEDICINE FOUND: "
                                    + medicineName
                    );
                }
            }


        } catch (Exception e) {

            System.out.println(
                    "ERROR PROCESSING GEMINI RESPONSE"
            );

            e.printStackTrace();

            throw new RuntimeException(
                    "Unable to process prescription AI response",
                    e
            );
        }


        return finalResults;
    }


    // ==============================================
    // CLEAN GEMINI JSON
    // ==============================================

    private String cleanJson(String response) {

        if (response == null) {

            throw new RuntimeException(
                    "Gemini returned empty response"
            );
        }

        response = response.trim();


        if (response.startsWith("```json")) {

            response =
                    response.substring(7);
        }


        if (response.startsWith("```")) {

            response =
                    response.substring(3);
        }


        if (response.endsWith("```")) {

            response =
                    response.substring(
                            0,
                            response.length() - 3
                    );
        }


        return response.trim();
    }
}