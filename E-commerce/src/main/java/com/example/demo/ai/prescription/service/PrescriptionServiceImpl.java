package com.example.demo.ai.prescription.service;

import com.example.demo.ai.chatbot.client.GeminiClient;
import org.springframework.stereotype.Service;
import com.example.demo.ai.chatbot.service.AiService;
import com.example.demo.ai.prescription.client.FDAClient;
import com.example.demo.ai.prescription.dto.FDAMedicineDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.List;

@Service
public class PrescriptionServiceImpl implements PrescriptionService {

    private final GeminiClient geminiClient;
    private final AiService aiService;
    private final FDAClient fdaClient;
    private final ObjectMapper objectMapper;
    public PrescriptionServiceImpl(GeminiClient geminiClient, AiService aiService, FDAClient fdaClient, ObjectMapper objectMapper) {
        this.geminiClient = geminiClient;
        this.aiService = aiService;
        this.fdaClient = fdaClient;
        this.objectMapper = objectMapper;
    }

    @Override
    public String analyzePrescription(String extractedText) {

         System.out.println("========== PRESCRIPTION SERVICE ==========");
    System.out.println("OCR TEXT:");
    System.out.println(extractedText);
    System.out.println("==========================================");

            String aiResult = geminiClient.askGemini(
                "Analyze this doctor's prescription and identify "
                + "the medicine names.\n\n"
                +"Return only medicine name,without any explanation or additional text. \n\n"
                + extractedText
        );
        System.out.println("========== GEMINI RESULT ==========");
    System.out.println(aiResult);
    System.out.println("===================================");

 // Step 2: For now assume Gemini returns one medicine
    String [] medicines = aiResult.split("\\R");//split by new line

    List<FDAMedicineDto> fdaResults = new ArrayList<>();


    for (String medicineName : medicines) {

    medicineName = medicineName.trim();

    if (medicineName.isEmpty()) {
        continue;
    }


        // Step 3: Search FDA
    System.out.println("========== FDA SEARCH ==========");
    System.out.println("Searching FDA for: " + medicineName);
   
    FDAMedicineDto fdaResult = fdaClient.searchMedicine(medicineName);

    fdaResults.add(fdaResult);

    System.out.println("FDA RESULT RECEIVED");
    System.out.println("================================");
    }

    

    try {

            return objectMapper.writeValueAsString(medicineName);

        } catch (JsonProcessingException e) {

            System.out.println(
                    "ERROR CONVERTING FDA DTO TO JSON"
            );

            e.printStackTrace();


return "{\"message\":\"Unable to create FDA response\"}";

        }   
        

}
}