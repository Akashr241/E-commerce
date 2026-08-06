package com.example.demo.ai.prescription.dto;

public class PrescriptionRequestDto {

    private String language = "English";

    public PrescriptionRequestDto() {
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}
