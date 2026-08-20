package com.example.demo.ai.prescription.dto;

public class MedicineResponseDto {

    private Long id;
    private String name;
    private Double price;
    private Boolean discontinued;
    private String manufacturerName;
    private String type;
    private String packSizeLabel;
    private String shortComposition1;
    private String shortComposition2;

    public MedicineResponseDto() {
    }

    public MedicineResponseDto(
            Long id,
            String name,
            Double price,
            Boolean discontinued,
            String manufacturerName,
            String type,
            String packSizeLabel,
            String shortComposition1,
            String shortComposition2) {

        this.id = id;
        this.name = name;
        this.price = price;
        this.discontinued = discontinued;
        this.manufacturerName = manufacturerName;
        this.type = type;
        this.packSizeLabel = packSizeLabel;
        this.shortComposition1 = shortComposition1;
        this.shortComposition2 = shortComposition2;
    }

    // Getters

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Double getPrice() {
        return price;
    }

    public Boolean getDiscontinued() {
        return discontinued;
    }

    public String getManufacturerName() {
        return manufacturerName;
    }

    public String getType() {
        return type;
    }

    public String getPackSizeLabel() {
        return packSizeLabel;
    }

    public String getShortComposition1() {
        return shortComposition1;
    }

    public String getShortComposition2() {
        return shortComposition2;
    }

    // Setters

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public void setDiscontinued(Boolean discontinued) {
        this.discontinued = discontinued;
    }

    public void setManufacturerName(String manufacturerName) {
        this.manufacturerName = manufacturerName;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setPackSizeLabel(String packSizeLabel) {
        this.packSizeLabel = packSizeLabel;
    }

    public void setShortComposition1(String shortComposition1) {
        this.shortComposition1 = shortComposition1;
    }

    public void setShortComposition2(String shortComposition2) {
        this.shortComposition2 = shortComposition2;
    }
}