package com.example.demo.cart.dto;

public class CartItemResponseDto {

    private Long id;
    private String productName;
    private int quantity;
    private double price;

    public CartItemResponseDto() {
    }

    public CartItemResponseDto(
            Long id,
            String productName,
            int quantity,
            double price) {

        this.id = id;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
    }

    // getters setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
