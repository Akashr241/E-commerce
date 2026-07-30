package com.example.demo.ai.dto;

public class AiRequestDto {

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