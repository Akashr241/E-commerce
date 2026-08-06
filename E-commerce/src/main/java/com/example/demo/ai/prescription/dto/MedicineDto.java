package com.example.demo.ai.prescription.dto;

public class MedicineDto {

    private String medicineName;

    private String dosage;

    private String duration;

    private String timing;

    private String purpose;

    private String precautions;

    public MedicineDto() {
    }

    public MedicineDto(String medicineName,
                       String dosage,
                       String duration,
                       String timing,
                       String purpose,
                       String precautions) {
        this.medicineName = medicineName;
        this.dosage = dosage;
        this.duration = duration;
        this.timing = timing;
        this.purpose = purpose;
        this.precautions = precautions;
    }

    public String getMedicineName() {
        return medicineName;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    public String getDosage() {
        return dosage;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getTiming() {
        return timing;
    }

    public void setTiming(String timing) {
        this.timing = timing;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getPrecautions() {
        return precautions;
    }

    public void setPrecautions(String precautions) {
        this.precautions = precautions;
    }
}