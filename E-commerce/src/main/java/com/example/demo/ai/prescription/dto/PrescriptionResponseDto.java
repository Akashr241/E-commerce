package com.example.demo.ai.prescription.dto;

public class PrescriptionResponseDto {

    // AI extracted information
    private String medicineName;
    private String dosage;
    private String frequency;
    private String duration;

    // Database product information
    private Long productId;
    private String productName;
    private Double price;
    private String manufacturerName;
    private String type;
    private String packSizeLabel;
    private String shortComposition1;
    private String shortComposition2;

    public PrescriptionResponseDto() {
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

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getManufacturerName() {
        return manufacturerName;
    }

    public void setManufacturerName(String manufacturerName) {
        this.manufacturerName = manufacturerName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPackSizeLabel() {
        return packSizeLabel;
    }

    public void setPackSizeLabel(String packSizeLabel) {
        this.packSizeLabel = packSizeLabel;
    }

    public String getShortComposition1() {
        return shortComposition1;
    }

    public void setShortComposition1(String shortComposition1) {
        this.shortComposition1 = shortComposition1;
    }

    public String getShortComposition2() {
        return shortComposition2;
    }

    public void setShortComposition2(String shortComposition2) {
        this.shortComposition2 = shortComposition2;
    }
}