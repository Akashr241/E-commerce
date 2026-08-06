package com.example.demo.ai.prescription.dto;


public class OCRResponseDto {

    private String extractedText;

    public OCRResponseDto() {
    }

    public OCRResponseDto(String extractedText) {
        this.extractedText = extractedText;
    }

    public String getExtractedText() {
        return extractedText;
    }

    public void setExtractedText(String extractedText) {
        this.extractedText = extractedText;
    }
}