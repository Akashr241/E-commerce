package com.example.demo.ai.client;
import com.example.demo.ai.config.AiConfig;
import org.springframework.stereotype.Component;

@Component
public class GeminiClient {

    private final AiConfig aiConfig;

    public GeminiClient(AiConfig aiConfig) {
        this.aiConfig = aiConfig;
    }

    public String askGemini(String prompt) {

        // We will implement the HTTP call next.
        return "Gemini Response";

    }
}
