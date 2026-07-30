package com.example.demo.ai.controller;
import com.example.demo.ai.service.AiService;

import org.springframework.web.bind.annotation.*;
import com.example.demo.ai.dto.AiRequestDto;
import com.example.demo.ai.dto.AiResponseDto;


  @RestController
@RequestMapping("/api/ai")
public class AiController {

  private final AiService aiService;
  
  public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/chat")
    public AiResponseDto chat(@RequestBody AiRequestDto request) {

        String response = aiService.askAI(request.getPrompt());

        return new AiResponseDto(response);
    }
}
  

