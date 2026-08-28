
package com.example.demo.ai.prescription.dto;

public class PrescriptionAnalysisResponseDto {

    private String extractedText;
    private PrescriptionMedicineDto medicine;

    public PrescriptionAnalysisResponseDto() {
    }

    public PrescriptionAnalysisResponseDto(
            String extractedText,
            PrescriptionMedicineDto medicine) {

        this.extractedText = extractedText;
        this.medicine = medicine;
    }

    public String getExtractedText() {
        return extractedText;
    }

    public void setExtractedText(String extractedText) {
        this.extractedText = extractedText;
    }

    public PrescriptionMedicineDto getMedicine() {
        return medicine;
    }

    public void setMedicine(PrescriptionMedicineDto medicine) {
        this.medicine = medicine;
    }
}