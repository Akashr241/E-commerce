package com.example.demo.ai.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import com.google.genai.types.Model;

@Component
public class GeminiClient {

    @Value("${gemini.api.key}")
    private String apiKey;

    public String askGemini(String prompt) {

        Client client = Client.builder()
                .apiKey(apiKey)
                .build();

        GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-3.6-flash",
                        prompt,
                        null
                );

        return response.text();
    }
}