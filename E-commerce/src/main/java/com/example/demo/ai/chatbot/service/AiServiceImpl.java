package com.example.demo.ai.chatbot.service;
import org.springframework.stereotype.Service;
import com.example.demo.ai.chatbot.client.GeminiClient;
@Service
public class AiServiceImpl implements AiService {

    private final GeminiClient geminiClient;

    public AiServiceImpl(GeminiClient geminiClient) {
        this.geminiClient = geminiClient;
    }

    @Override
    public String askAI(String prompt) {

        return geminiClient.askGemini(prompt);

    }
}