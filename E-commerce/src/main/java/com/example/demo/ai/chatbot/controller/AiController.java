package com.example.demo.ai.chatbot.controller;

import com.example.demo.ai.chatbot.dto.AiRequestDto;
import com.example.demo.ai.chatbot.dto.AiResponseDto;
import com.example.demo.ai.chatbot.service.AiService;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/chat")
    public ResponseEntity<AiResponseDto> chat(
            @Valid @RequestBody AiRequestDto request) {

        String answer = aiService.askAI(request.getPrompt());

        AiResponseDto response = new AiResponseDto(answer);

        return ResponseEntity.ok(response);
    }
}