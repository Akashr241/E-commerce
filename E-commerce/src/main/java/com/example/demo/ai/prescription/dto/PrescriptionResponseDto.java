package com.example.demo.ai.prescription.dto;
import java.util.List;

public class PrescriptionResponseDto {

    private String patientName;

    private String doctorName;

    private String summary;

    private List<MedicineDto> medicines;

    public PrescriptionResponseDto() {
    }

    public PrescriptionResponseDto(String patientName,
                                   String doctorName,
                                   String summary,
                                   List<MedicineDto> medicines) {
        this.patientName = patientName;
        this.doctorName = doctorName;
        this.summary = summary;
        this.medicines = medicines;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public List<MedicineDto> getMedicines() {
        return medicines;
    }

    public void setMedicines(List<MedicineDto> medicines) {
        this.medicines = medicines;
    }
}
