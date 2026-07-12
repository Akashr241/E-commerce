package com.example.demo.cart.dto;

public class CartItemResponseDto {

    private Long id;

    private String productName;

    private double price;

    private int quantity;

    private double subTotal;

    public CartItemResponseDto() {
    }

    public CartItemResponseDto(
            Long id,
            String productName,
            double price,
            int quantity,
            double subTotal) {

        this.id = id;
        this.productName = productName;
        this.price = price;
        this.quantity = quantity;
        this.subTotal = subTotal;
    }

    public Long getId() {
        return id;
    }

    public String getProductName() {
        return productName;
    }

    public double getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }

    public double getSubTotal() {
        return subTotal;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setSubTotal(double subTotal) {
        this.subTotal = subTotal;
    }
}