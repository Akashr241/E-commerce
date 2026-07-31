package com.example.demo.ai.dto;

import jakarta.validation.constraints.NotBlank;

public class AiRequestDto {
    @NotBlank(message = "Prompt cannot be empty ")
    private String prompt;

    public AiRequestDto() {
    }

    public AiRequestDto(String prompt) {
        this.prompt = prompt;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }
}