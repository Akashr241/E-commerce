package com.example.demo.ai.prescription.service;

import com.example.demo.ai.chatbot.client.GeminiClient;
import org.springframework.stereotype.Service;

@Service
public class PrescriptionServiceImpl implements PrescriptionService {

    private final GeminiClient geminiClient;

    public PrescriptionServiceImpl(GeminiClient geminiClient) {
        this.geminiClient = geminiClient;
    }

    @Override
    public String analyzePrescription(String extractedText) {

        String prompt = """
                You are a prescription understanding assistant.

                The following text was extracted from a doctor's prescription
                using OCR.

                OCR can contain spelling mistakes and incorrectly recognized
                characters.

                Your task is to understand and structure the prescription.

                Extract:
                - Patient name
                - Date
                - Clinical description if available
                - Medicine name
                - Dosage
                - Frequency
                - Duration
                - Instructions

                Important rules:
                1. Do not invent information.
                2. If something cannot be confidently understood, write "Unknown".
                3. Do not create a medicine name that is not present in the OCR.
                4. Do not diagnose the patient.
                5. Do not recommend a different medicine.
                6. Preserve uncertainty when the OCR text is unclear.

                OCR TEXT:
                
                """ + extractedText;

        return geminiClient.askGemini(prompt);
    }
}