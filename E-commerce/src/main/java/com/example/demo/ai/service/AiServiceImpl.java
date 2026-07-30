package com.example.demo.ai.service;
import org.springframework.stereotype.Service;

@Service
public class AiServiceImpl implements AiService {

    @Override
    public String askAI(String prompt) {

        return "Hello from AI : " + prompt;

    }
}