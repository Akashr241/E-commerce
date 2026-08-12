
package com.example.demo.ai.prescription.dto;

public class FDAResponseDto {

    private String medicineName;
    private String response;

    public FDAResponseDto() {
    }

    public FDAResponseDto(String medicineName, String response) {
        this.medicineName = medicineName;
        this.response = response;
    }

    public String getMedicineName() {
        return medicineName;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }
}