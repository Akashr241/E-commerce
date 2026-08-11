package com.example.demo.ai.prescription.dto;

import java.util.List;

public class PrescriptionResponseDto {

    private String patientName;
    private String date;
    private List<MedicineDto> medicines;
    private String clinicalDescription;
    private String warnings;

    public PrescriptionResponseDto() {
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public List<MedicineDto> getMedicines() {
        return medicines;
    }

    public void setMedicines(List<MedicineDto> medicines) {
        this.medicines = medicines;
    }

    public String getClinicalDescription() {
        return clinicalDescription;
    }

    public void setClinicalDescription(String clinicalDescription) {
        this.clinicalDescription = clinicalDescription;
    }

    public String getWarnings() {
        return warnings;
    }

    public void setWarnings(String warnings) {
        this.warnings = warnings;
    }

    public static class MedicineDto {

        private String medicineName;
        private String dosage;
        private String frequency;
        private String duration;
        private String instructions;

        public MedicineDto() {
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

        public String getFrequency() {
            return frequency;
        }

        public void setFrequency(String frequency) {
            this.frequency = frequency;
        }

        public String getDuration() {
            return duration;
        }

        public void setDuration(String duration) {
            this.duration = duration;
        }

        public String getInstructions() {
            return instructions;
        }

        public void setInstructions(String instructions) {
            this.instructions = instructions;
        }
    }
}