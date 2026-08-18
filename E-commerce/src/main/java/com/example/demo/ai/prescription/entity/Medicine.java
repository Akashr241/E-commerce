package com.example.demo.ai.prescription.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "medicines")
public class Medicine {

    @Id
    private Long id;

    private String name;

    private Double price;

    private Boolean discontinued;

    private String manufacturerName;

    private String type;

    private String packSizeLabel;

    private String shortComposition1;

    private String shortComposition2;

    public Medicine() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Boolean getDiscontinued() {
        return discontinued;
    }

    public void setDiscontinued(Boolean discontinued) {
        this.discontinued = discontinued;
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