package com.example.demo.ai.client;
import com.example.demo.ai.config.AiConfig;
import org.springframework.stereotype.Component;
import com.example.demo.ai.dto.GeminiRequest;
import com.example.demo.ai.dto.GeminiResponse;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
public class GeminiClient {

    private final RestTemplate restTemplate;
    private final AiConfig aiConfig;

    public GeminiClient(RestTemplate restTemplate,
                        AiConfig aiConfig) {

        this.restTemplate = restTemplate;
        this.aiConfig = aiConfig;
    }

public String askGemini(String prompt) {

    GeminiRequest.Part part = new GeminiRequest.Part(prompt);

    GeminiRequest.Content content = new GeminiRequest.Content(List.of(part));

    GeminiRequest request = new GeminiRequest(List.of(content));

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    HttpEntity<GeminiRequest> entity = new HttpEntity<>(request, headers);

    String url = aiConfig.getApiUrl() + "?key=" + aiConfig.getApiKey();

    // Debug prints
    System.out.println("====================================");
    System.out.println("Gemini URL = " + url);
    System.out.println("API Key = " + aiConfig.getApiKey());
    System.out.println("Prompt = " + prompt);
    System.out.println("====================================");

    try {

        ResponseEntity<GeminiResponse> response =
                restTemplate.postForEntity(
                        url,
                        entity,
                        GeminiResponse.class
                );

        GeminiResponse body = response.getBody();

        if (body == null
                || body.getCandidates() == null
                || body.getCandidates().isEmpty()) {

            return "No response from Gemini.";
        }

        return body.getCandidates()
                .get(0)
                .getContent()
                .getParts()
                .get(0)
                .getText();

    } catch (Exception e) {

        e.printStackTrace();
        throw e;
    }
}
}


